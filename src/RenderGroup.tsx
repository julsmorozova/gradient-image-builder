import { MutableRefObject } from "react";
import BackgroundGroup from "./BackgroundGroup";
import RenderBackgroundInput from "./RenderBackgroundInput";
import {
  BackgroundGroupType,
  GradientObjectAction,
  GradientObjectState,
} from "./store";
import {
  dragStart,
  getDragDirection,
  handleDragEnter,
  handleDragLeave,
  removeDirectionClasses,
} from "./tools";

type RenderGroupPropType = {
  group: BackgroundGroupType;
  items: string[];
  groups: BackgroundGroupType[];
  layoutListLength: number;
  editBackgroundValue: GradientObjectAction["editBackgroundValue"];
  handleDrag: GradientObjectAction["handleDrag"];
  toggleGroupAccordion: GradientObjectAction["toggleGroupAccordion"];
  layerRegistry: GradientObjectState["layerRegistry"];
  draggedElement: MutableRefObject<string | null>;
};
export default function RenderGroup({
  group,
  items,
  groups,
  layoutListLength,
  editBackgroundValue,
  handleDrag,
  toggleGroupAccordion,
  layerRegistry,
  draggedElement,
}: RenderGroupPropType) {
  return (
    group?.id &&
    items.length > 0 && (
      <div
        className="dnd-element group"
        key={group.id}
        id={group.id}
        draggable
        onDragStart={() => dragStart(group.id, draggedElement)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          removeDirectionClasses(e);
          draggedElement.current &&
            handleDrag(
              group.id,
              draggedElement.current,
              getDragDirection(e) ?? "before"
            );
        }}
      >
        <BackgroundGroup
          items={items}
          id={group.id}
          name={group.name}
          isGroupOpen={group.isOpen}
          onAccordionToggle={() => toggleGroupAccordion(group.id)}
          draggable
        >
          {items.map((i) => (
            <RenderBackgroundInput
              key={i}
              item={layerRegistry[i]}
              groupId={group.id}
              layoutListLength={layoutListLength}
              groups={groups}
              editBackgroundValue={editBackgroundValue}
              handleDrag={handleDrag}
              draggedElement={draggedElement}
            />
          ))}
        </BackgroundGroup>
      </div>
    )
  );
}
