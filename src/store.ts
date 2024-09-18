import { create } from "zustand";
import { handleClone } from "./tools";
import { createJSONStorage, persist } from "zustand/middleware";

export type BackgroundInputNumber = undefined | number;

export type BackgroundInput = {
  id: string;
  isAccordionOpen: boolean;
  name?: string;
  isDefaultData: boolean;
  isHidden?: boolean;
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
  isOpen?: boolean;
  childrenIds: string[];
};

export type GradientObjectState = {
  width: number;
  height: number;
  isBorderShown: boolean;
  borderWidth: number;
  groupCounter: number;
  layerCounter: number;
  backgroundGroups: BackgroundGroupType[];
  backgroundInputs: BackgroundInput[];
};

export type GradientObjectAction = {
  updateBackgroundInputs: (incomingState: BackgroundInput[]) => void;
  cloneLayer: (id: BackgroundInput["id"]) => void;
  editGradientObjectValue: (
    incomingState: Partial<GradientObjectState>
  ) => void;
  addBackgroundLayer: () => void;
  deleteBackgroundLayer: (id: BackgroundInput["id"]) => void;
  editBackgroundValue: (
    id: BackgroundInput["id"],
    valueName: keyof BackgroundInput,
    value:
      | BackgroundInput["value"]
      | BackgroundInputNumber
      | BackgroundInput["isAccordionOpen"]
  ) => void;
  editCheckboxValue: () => void;
  toggleAccordion: (id: BackgroundInput["id"]) => void;
  toggleLayerVisibility: (id: BackgroundInput["id"]) => void;
  moveToGroup: (
    layerId: BackgroundInput["id"],
    groupId: BackgroundGroupType["id"]
  ) => void;
  addGroup: (name: string) => void;
  editGroupName: (id: BackgroundGroupType["id"], name: string) => void;
  toggleGroupAccordion: (id: BackgroundGroupType["id"]) => void;
  deleteGroup: (groupId: BackgroundGroupType["id"]) => void;
  clearGroup: (groupId: BackgroundGroupType["id"]) => void;
  updateGroups: (incomingState: BackgroundGroupType[]) => void;
  updateGroupChildren: (
    id: BackgroundGroupType["id"],
    newChildren: BackgroundGroupType["childrenIds"]
  ) => void;
};

const gradientDefaultValue =
  "linear-gradient(transparent 0 30%, pink 30% 34%, transparent 34% 49%, #76ecd4 49% 53%, transparent 53%)";
const gradientDefaultValue1 =
  "radial-gradient(100% 100% at 50% 50%, #000 49.5%, transparent 50%)";

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
      backgroundGroups: [],
      backgroundInputs: [
        {
          id: new Date().valueOf().toString(),
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
      ],
      cloneLayer: (id) =>
        set({
          ...get(),
          layerCounter: get().layerCounter + 1,
          backgroundInputs: [...handleClone(get().backgroundInputs, id)],
        }),
      updateBackgroundInputs: (incomingState) =>
        set({ ...get(), backgroundInputs: [...incomingState] }),
      editGradientObjectValue: (incomingState) =>
        set({ ...get(), ...incomingState }),
      addBackgroundLayer: () =>
        set({
          ...get(),
          layerCounter: get().layerCounter + 1,
          backgroundInputs: [
            {
              id: new Date().valueOf().toString(),
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
            ...get().backgroundInputs,
          ],
        }),
      deleteBackgroundLayer: (id) =>
        set({
          ...get(),
          backgroundInputs: get().backgroundInputs.filter(
            (item) => item.id !== id
          ),
        }),
      editBackgroundValue: (id, valueName, value) =>
        set({
          ...get(),
          backgroundInputs: get().backgroundInputs.map((i) => {
            if (i.id === id) {
              return { ...i, isDefaultData: false, [valueName]: value };
            } else {
              return i;
            }
          }),
        }),
      editCheckboxValue: () =>
        set({ ...get(), isBorderShown: !get().isBorderShown }),
      toggleAccordion: (id) =>
        set({
          ...get(),
          backgroundInputs: get().backgroundInputs.map((i) => {
            if (i.id === id) {
              return { ...i, isAccordionOpen: !i.isAccordionOpen };
            } else {
              return i;
            }
          }),
        }),
      toggleLayerVisibility: (id) =>
        set({
          ...get(),
          backgroundInputs: get().backgroundInputs.map((i) => {
            if (i.id === id) {
              return { ...i, isHidden: !i.isHidden };
            } else {
              return i;
            }
          }),
        }),
      moveToGroup: (layerId, groupId) =>
        set({
          ...get(),
          backgroundGroups: get().backgroundGroups.map((i) => {
            if (i.id === groupId && !i.childrenIds.includes(layerId)) {
              return {
                ...i,
                childrenIds: [
                  ...(get().backgroundGroups.find((el) => el.id === groupId)
                    ?.childrenIds ?? []),
                  layerId,
                ],
              };
            } else {
              return {
                ...i,
                childrenIds: [
                  ...(get()
                    .backgroundGroups.find((el) => el?.id === i.id)
                    ?.childrenIds?.filter((childId) => childId !== layerId) ??
                    []),
                ],
              };
            }
          }),
        }),
      addGroup: (name) =>
        set({
          ...get(),
          groupCounter: get().layerCounter + 1,
          backgroundGroups: [
            {
              id: new Date().valueOf().toString() + "-group",
              name: name ?? `group-${get().groupCounter + 1}`,
              isOpen: false,
              childrenIds: [],
            },
            ...get().backgroundGroups,
          ],
        }),
      editGroupName: (id, name) =>
        set({
          ...get(),
          backgroundGroups: [
            ...get().backgroundGroups.map((i) => {
              if (i.id === id) {
                return { ...i, name: name };
              } else {
                return i;
              }
            }),
          ],
        }),
      toggleGroupAccordion: (id) =>
        set({
          ...get(),
          backgroundGroups: [
            ...get().backgroundGroups.map((i) => {
              if (i.id === id) {
                return { ...i, isOpen: !i.isOpen };
              } else {
                return i;
              }
            }),
          ],
        }),
      deleteGroup: (groupId) =>
        set({
          ...get(),
          backgroundGroups: [
            ...get().backgroundGroups.filter((i) => i.id !== groupId),
          ],
        }),
      clearGroup: (groupId) =>
        set({
          ...get(),
          backgroundGroups: [
            ...get().backgroundGroups.map((i) => {
              if (i.id === groupId) {
                return {
                  ...i,
                  childrenIds: [],
                };
              } else {
                return i;
              }
            }),
          ],
        }),
      updateGroups: (incomingState) =>
        set({ ...get(), backgroundGroups: [...incomingState] }),
      updateGroupChildren: (id, newChildren) =>
        set({
          ...get(),
          backgroundGroups: [
            ...get().backgroundGroups.map((i) => {
              if (i.id === id) {
                console.log("newChildren in store", newChildren, {
                  ...i,
                  childrenIds: [...newChildren],
                });
                return { ...i, childrenIds: [...newChildren] };
              } else {
                return i;
              }
            }),
          ],
        }),
    }),
    {
      name: `gradient-image`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
