import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export function isLayerGroup(
  item: BackgroundInput | BackgroundGroupType
): item is BackgroundGroupType {
  return "children" in item;
}

export type BackgroundInputNumber = undefined | number;

export type BackgroundInput = {
  id: string;
  isAccordionOpen: boolean;
  name: string;
  isDefaultData: boolean;
  isHidden: boolean;
  value?: string | React.ChangeEvent<Element>;
  x?: number;
  y?: BackgroundInputNumber;
  w?: BackgroundInputNumber;
  h?: BackgroundInputNumber;
  repeat?: string;
};

export type BackgroundGroupType = {
  id: string;
  name?: string;
  isAccordionOpen?: boolean;
};

export type LayerRegistry = Record<string, BackgroundInput>;
export type GroupRegistry = Record<string, BackgroundGroupType>;
export type LayoutGroup = { id: string; children: string[] };
export type Layout = (string | LayoutGroup)[];

export function setHidden(
  value: boolean,
  groupId: string,
  layout: Layout,
  layerRegistry: LayerRegistry,
  groupRegistry: GroupRegistry
): [Layout, LayerRegistry, GroupRegistry] {
  getGroupLayers(groupId, layout).forEach((id) => {
    layerRegistry[id].isHidden = value;
  });
  return [layout, layerRegistry, groupRegistry];
}

export function getGroupLayers(groupId: string, layout: Layout): string[] {
  const group = layout.find(
    (item) => typeof item !== "string" && item.id === groupId
  );
  return group && typeof group !== "string" ? group.children : [];
}

export function deleteGroup(
  groupId: string,
  layout: Layout,
  layerRegistry: LayerRegistry,
  groupRegistry: GroupRegistry
): [Layout, LayerRegistry, GroupRegistry] {
  const childrenIds = getGroupLayers(groupId, layout);
  return [
    layout.filter((item) => isString(item) || item.id !== groupId),
    Object.fromEntries(
      Object.entries(layerRegistry).filter(([id]) => !childrenIds.includes(id))
    ),
    Object.fromEntries(
      Object.entries(groupRegistry).filter(([id]) => id !== groupId)
    ),
  ];
}

export function handleClearGroup(groupId: string, layout: Layout): Layout {
  const childrenIds = getGroupLayers(groupId, layout);
  return [
    ...layout.flatMap((i) => {
      if (!isString(i) && i.id === groupId) {
        const newItem = { ...i, children: [] };
        return [...childrenIds, newItem];
      } else return i;
    }),
  ];
}

export function deleteLayer(
  layerId: string,
  layout: Layout,
  layerRegistry: LayerRegistry,
  groupRegistry: GroupRegistry
): [Layout, LayerRegistry, GroupRegistry] {
  const updatedLayerRegistry = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.entries(layerRegistry).filter(([k, v]) => k !== layerId)
  );
  return [
    layout.flatMap((item) => {
      if (isString(item) && item === layerId) {
        return [];
      } else if (!isString(item) && item.children.includes(layerId)) {
        return {
          ...item,
          children: item.children.filter((item) => item !== layerId),
        };
      }
      return item;
    }),
    updatedLayerRegistry,
    groupRegistry,
  ];
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

function isLayerPresentInOtherGroups(
  layerId: string,
  groupId: string,
  layout: Layout
): { present: boolean; groupId: string } {
  for (const i of layout) {
    if (!isString(i) && i.children.includes(layerId) && i.id !== groupId) {
      return { present: true, groupId: i.id };
    }
  }
  return { present: false, groupId: "" };
}

function isGroupItem(layerId: string, layout: Layout): boolean {
  for (const i of layout) {
    if (!isString(i) && i.children.includes(layerId)) {
      return true;
    }
  }
  return false;
}

export function handleMoveToGroup(
  layerId: string,
  groupId: string,
  layout: Layout,
  groupRegistry: GroupRegistry
): [Layout, GroupRegistry] {
  const updatedGroupRegistry = Object.fromEntries(
    Object.entries(groupRegistry).map(([k, v]) => {
      if (k === groupId) {
        return [k, { ...v, isAccordionOpen: true }];
      } else {
        return [k, v];
      }
    })
  );
  return [
    layout.flatMap((item) => {
      if (item === layerId) {
        return [];
      }
      // it's the target group and it doesn't have this elem among children yet
      if (
        !isString(item) &&
        item.id === groupId &&
        !item.children.includes(layerId)
      ) {
        return {
          ...item,
          children: [layerId, ...item.children],
        };
      }
      // it's some group and it has this elem among children
      if (!isString(item) && item.children.includes(layerId)) {
        if (isLayerPresentInOtherGroups(layerId, groupId, layout).groupId) {
          return {
            ...item,
            children: item.children.filter((item) => item !== layerId),
          };
        }

        // we're adding the item back to layout, outside the group
        return [
          layerId,
          {
            ...item,
            children: item.children.filter((item) => item !== layerId),
          },
        ];
      }
      if (!isString(item) && item.id !== groupId) {
        return {
          ...item,
          children: item.children.filter((item) => item !== layerId),
        };
      }
      return item;
    }),
    updatedGroupRegistry,
  ];
}

function isClonePresent(layerName: string, layerRegistry: LayerRegistry) {
  for (const i of Object.values(layerRegistry)) {
    if (i.name.includes(layerName + "_clone-")) {
      return true;
    }
  }
  return false;
}

function getCloneNumber(layerName: string): number {
  return +layerName?.substring(layerName?.lastIndexOf("-") + 1);
}

function sortClonesByNumber(layerRegistry: LayerRegistry) {
  return [...Object.values(layerRegistry)]
    .filter((i) => i.name.includes("_clone-"))
    .sort((a, b) => getCloneNumber(b.name) - getCloneNumber(a.name));
}

function findLastCloneLayerName(layerRegistry: LayerRegistry, layerId: string) {
  const layerName = layerRegistry[layerId].name;
  const searchId =
    layerName && layerName.includes("_clone-")
      ? layerName.substring(0, layerName.lastIndexOf("-") + 1)
      : layerName + "_clone-";
  return sortClonesByNumber(layerRegistry).find((i) =>
    i.name.includes(searchId)
  )?.name;
}

export function cloneLayer(
  layerId: string,
  layout: Layout,
  layerRegistry: LayerRegistry,
  groupRegistry: GroupRegistry
): [Layout, LayerRegistry, GroupRegistry] {
  let newName = "";
  const layerName = layerRegistry[layerId].name;
  if (
    isClonePresent(layerName, layerRegistry) ||
    layerName.includes("_clone-")
  ) {
    const lastCloneName = findLastCloneLayerName(layerRegistry, layerId);
    const newCloneNum =
      lastCloneName &&
      +lastCloneName?.substring(lastCloneName?.lastIndexOf("-") + 1) + 1;
    newName =
      (lastCloneName &&
        lastCloneName.substring(0, lastCloneName.lastIndexOf("-") + 1) +
          newCloneNum) ??
      "new clone";
  } else {
    newName = layerRegistry[layerId].name + "_clone-" + 0;
  }
  const newId = crypto.randomUUID();
  const newLayerRegistry = {
    ...layerRegistry,
    [newId]: {
      ...layerRegistry[layerId],
      name: newName,
      id: newId,
      isDefaultData: false,
    },
  };
  return [
    layout.flatMap((item) => {
      if (isString(item) && item === layerId) {
        return [newId, item];
      } else if (!isString(item) && item.children.includes(layerId)) {
        return {
          ...item,
          children: item.children.flatMap((item) =>
            item === layerId ? [newId, item] : item
          ),
        };
      }
      return item;
    }),
    newLayerRegistry,
    groupRegistry,
  ];
}

export function isGroup(item: unknown): item is LayoutGroup {
  return !isString(item);
}

export function handleDragByDirection(
  targetId: string,
  sourceId: string,
  direction: string,
  layout: Layout,
  layerRegistry: LayerRegistry,
  groupRegistry: GroupRegistry
): [Layout, LayerRegistry, GroupRegistry] {
  if (targetId === sourceId) {
    return [layout, layerRegistry, groupRegistry];
  }
  const sourceItem =
    sourceId in groupRegistry
      ? (layout.find((i) => isGroup(i) && i.id === sourceId) as LayoutGroup)
      : sourceId;
  if (direction === "before" || direction === "after") {
    return [
      layout.flatMap((item) => {
        if (isGroup(sourceItem) && isGroupItem(targetId, layout)) {
          return item;
        }
        if (item === sourceItem) {
          return [];
        }
        if (item === targetId) {
          return direction === "before"
            ? [sourceItem, item]
            : [item, sourceItem];
        }
        // if we're inserting before or after a group
        if (isGroup(item) && item.id === targetId) {
          const newItem = {
            ...item,
            children: item.children.filter((i) => i !== sourceItem),
          };
          return direction === "before"
            ? [sourceItem, newItem]
            : [newItem, sourceItem];
        }
        // if it's within a group
        if (isGroup(item)) {
          if (item.id !== targetId && !isGroup(sourceItem)) {
            return {
              ...item,
              children: item.children
                // remove the draggable item from previous position
                .filter((i) => i !== sourceItem)
                // insert before or after target
                .flatMap((i) =>
                  i === targetId
                    ? direction === "before"
                      ? [sourceId, i]
                      : [i, sourceId]
                    : i
                ),
            };
          } else {
            // if the group is the target, add our layer inside the group
            if (!isGroup(sourceItem)) {
              return {
                ...item,
                children:
                  direction === "before"
                    ? [
                        sourceId,
                        ...item.children.filter((item) => item !== sourceId),
                      ]
                    : [
                        ...item.children.filter((item) => item !== sourceId),
                        sourceId,
                      ],
              };
            }
          }
        }
        return item;
      }),
      layerRegistry,
      groupRegistry,
    ];
  } else {
    return [
      layout.flatMap((item) => {
        if (item === sourceItem && !isGroup(item) && !isGroup(sourceItem)) {
          return [];
        }
        if (isGroup(item) && !isGroup(sourceItem)) {
          return item.id !== targetId
            ? {
                ...item,
                children: item.children
                  .filter((i) => i !== sourceItem)
                  .flatMap((i) => (i === targetId ? [sourceId, i] : i)),
              }
            : {
                ...item,
                children: [
                  sourceId,
                  ...item.children.filter((item) => item !== sourceId),
                ],
              };
        }
        if (item === targetId && !isGroup(item) && !isGroup(sourceItem)) {
          return [sourceItem, item];
        }
        return item;
      }),
      layerRegistry,
      groupRegistry,
    ];
  }
}

export type GradientObjectState = {
  width: number;
  height: number;
  isBorderShown: boolean;
  borderWidth: number;
  groupCounter: number;
  layerCounter: number;
  groupRegistry: GroupRegistry;
  layerRegistry: LayerRegistry;
  layout: Layout;
};

export type GradientObjectAction = {
  cloneLayer: (layerId: BackgroundInput["id"]) => void;
  editGradientObjectValue: (
    incomingState: Partial<GradientObjectState>
  ) => void;
  addBackgroundLayer: () => void;
  deleteLayer: (layerId: string) => void;
  editBackgroundValue: (
    id: BackgroundInput["id"],
    valueName: keyof BackgroundInput,
    value:
      | BackgroundInput["value"]
      | BackgroundInputNumber
      | BackgroundInput["isAccordionOpen"]
  ) => void;
  editCheckboxValue: () => void;
  toggleAccordion: (id: BackgroundInput["id"], isOpen?: boolean) => void;
  toggleLayerVisibility: (id: BackgroundInput["id"]) => void;
  moveToGroup: (
    layerId: BackgroundInput["id"],
    groupId: BackgroundGroupType["id"]
  ) => void;
  addGroup: (layerId: string, name: string) => void;
  editGroupName: (id: BackgroundGroupType["id"], name: string) => void;
  toggleGroupAccordion: (
    id: BackgroundGroupType["id"],
    isOpen?: boolean
  ) => void;
  deleteGroup: (groupId: BackgroundGroupType["id"]) => void;
  clearGroup: (groupId: BackgroundGroupType["id"]) => void;
  handleDrag: (targetId: string, sourceId: string, direction: string) => void;
};

const gradientDefaultValue =
  "linear-gradient(transparent 0 30%, pink 30% 34%, transparent 34% 49%, #76ecd4 49% 53%, transparent 53%)";
const gradientDefaultValue1 =
  "radial-gradient(100% 100% at 50% 50%, #000 49.5%, transparent 50%)";

const uuid = crypto.randomUUID();

export const useGradientStore = create<
  GradientObjectState & GradientObjectAction
>()(
  persist(
    (set, get) => ({
      width: 20,
      height: 20,
      isBorderShown: true,
      borderWidth: 1,
      groupCounter: 0,
      layerCounter: 1,
      groupRegistry: {},
      layerRegistry: {
        [uuid]: {
          id: uuid,
          isAccordionOpen: true,
          name: "layer-1",
          isDefaultData: true,
          isHidden: false,
          value: gradientDefaultValue1,
          x: 30,
          y: 30,
          w: 20,
          h: 20,
          repeat: "no-repeat",
        },
      },
      layout: [uuid],
      cloneLayer: (layerId) => {
        const [layout, layerRegistry, groupRegistry] = cloneLayer(
          layerId,
          get().layout,
          get().layerRegistry,
          get().groupRegistry
        );
        set({
          ...get(),
          layerCounter: get().layerCounter + 1,
          layout,
          layerRegistry,
          groupRegistry,
        });
      },
      editGradientObjectValue: (incomingState) =>
        set({ ...get(), ...incomingState }),
      addBackgroundLayer: () => {
        const newId = crypto.randomUUID();
        set({
          ...get(),
          layerCounter: get().layerCounter + 1,
          layout: [newId, ...get().layout],
          layerRegistry: {
            [newId]: {
              id: newId,
              isAccordionOpen: true,
              name: `layer-${get().layerCounter + 1}`,
              isDefaultData: true,
              isHidden: false,
              value: gradientDefaultValue,
              x: 0,
              y: 0,
              w: 100,
              h: 100,
              repeat: "no-repeat",
            },
            ...get().layerRegistry,
          },
        });
      },
      deleteLayer: (layerId) => {
        const [layout, layerRegistry, groupRegistry] = deleteLayer(
          layerId,
          get().layout,
          get().layerRegistry,
          get().groupRegistry
        );
        set({
          ...get(),
          layout,
          layerRegistry,
          groupRegistry,
        });
      },
      editBackgroundValue: (id, valueName, value) =>
        set({
          ...get(),
          layerRegistry: Object.fromEntries(
            Object.entries(get().layerRegistry).map(([k, v]) => {
              if (k === id) {
                const newV = { ...v, isDefaultData: false, [valueName]: value };
                return [k, newV];
              } else {
                return [k, v];
              }
            })
          ),
        }),
      editCheckboxValue: () =>
        set({ ...get(), isBorderShown: !get().isBorderShown }),
      toggleAccordion: (id, isOpen) =>
        set({
          ...get(),
          layerRegistry: Object.fromEntries(
            Object.entries(get().layerRegistry).map(([k, v]) => {
              if (k === id) {
                return [
                  k,
                  {
                    ...v,
                    isAccordionOpen:
                      isOpen !== undefined ? isOpen : !v.isAccordionOpen,
                  },
                ];
              } else {
                return [k, v];
              }
            })
          ),
        }),
      toggleLayerVisibility: (id) =>
        set({
          ...get(),
          layerRegistry: Object.fromEntries(
            Object.entries(get().layerRegistry).map(([k, v]) => {
              if (k === id) {
                return [k, { ...v, isHidden: !v.isHidden }];
              } else {
                return [k, v];
              }
            })
          ),
        }),
      moveToGroup: (layerId, groupId) => {
        const [layout, groupRegistry] = handleMoveToGroup(
          layerId,
          groupId,
          get().layout,
          get().groupRegistry
        );
        set({
          ...get(),
          layout,
          groupRegistry,
        });
      },
      addGroup: (layerId, name) => {
        const newId = crypto.randomUUID();
        set({
          ...get(),
          groupCounter: get().layerCounter + 1,
          layout: get().layout.flatMap((i) => {
            const newItem = { id: newId, children: [] };
            if (isString(i) && i === layerId) {
              return [newItem, i];
            } else if (!isString(i) && i.children.includes(layerId)) {
              return [newItem, i];
            } else {
              return i;
            }
          }),
          groupRegistry: {
            [newId]: {
              id: newId,
              name: name ?? `group-${get().groupCounter + 1}`,
              isAccordionOpen: false,
            },
            ...get().groupRegistry,
          },
        });
      },
      editGroupName: (id, name) =>
        set({
          ...get(),
          groupRegistry: Object.fromEntries(
            Object.entries(get().groupRegistry).map(([k, v]) => {
              if (k === id) {
                return [k, { ...v, name: name }];
              } else {
                return [k, v];
              }
            })
          ),
        }),
      toggleGroupAccordion: (id, isOpen) =>
        set({
          ...get(),
          groupRegistry: Object.fromEntries(
            Object.entries(get().groupRegistry).map(([k, v]) => {
              if (k === id) {
                return [
                  k,
                  {
                    ...v,
                    isAccordionOpen:
                      isOpen !== undefined ? isOpen : !v.isAccordionOpen,
                  },
                ];
              } else {
                return [k, v];
              }
            })
          ),
        }),
      deleteGroup: (groupId) => {
        const [layout, layerRegistry, groupRegistry] = deleteGroup(
          groupId,
          get().layout,
          get().layerRegistry,
          get().groupRegistry
        );
        set({
          ...get(),
          layout,
          layerRegistry,
          groupRegistry,
        });
      },
      clearGroup: (groupId) => {
        set({
          ...get(),
          layout: handleClearGroup(groupId, get().layout),
        });
      },
      handleDrag: (targetId, sourceId, direction) => {
        const [layout, layerRegistry, groupRegistry] = handleDragByDirection(
          targetId,
          sourceId,
          direction,
          get().layout,
          get().layerRegistry,
          get().groupRegistry
        );
        set({
          ...get(),
          layout,
          layerRegistry,
          groupRegistry,
        });
      },
    }),
    {
      name: `gradient-image`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
