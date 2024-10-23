import { MutableRefObject } from "react";
import BackgroundBlock from "./BackgroundBlock";
import {
  BackgroundGroupType,
  BackgroundInput,
  GradientObjectAction,
  LayerRegistry,
} from "./store";
import {
  dragStart,
  getDragDirection,
  handleDragEnter,
  handleDragLeave,
  removeDirectionClasses,
} from "./tools";

type RenderBackgroundInputPropsType = {
  item: BackgroundInput;
  groupId?: string;
  groups: BackgroundGroupType[];
  layoutListLength: number;
  editBackgroundValue: GradientObjectAction["editBackgroundValue"];
  handleDrag: GradientObjectAction["handleDrag"];
  draggedElement: MutableRefObject<string | null>;
  deleteLayer: GradientObjectAction["deleteLayer"];
  cloneLayer: GradientObjectAction["cloneLayer"];
  moveToGroup: GradientObjectAction["moveToGroup"];
  addGroup: GradientObjectAction["addGroup"];
  clearGroup: GradientObjectAction["clearGroup"];
  deleteGroup: GradientObjectAction["deleteGroup"];
  toggleAccordion: GradientObjectAction["toggleGroupAccordion"];
  toggleVisibility: GradientObjectAction["toggleLayerVisibility"];
  layerRegistry: LayerRegistry;
};

export default function RenderBackgroundInput({
  item,
  groupId,
  groups,
  layoutListLength,
  editBackgroundValue,
  handleDrag,
  draggedElement,
  deleteLayer,
  cloneLayer,
  toggleVisibility,
  toggleAccordion,
  addGroup,
  moveToGroup,
  clearGroup,
  deleteGroup,
  layerRegistry,
}: RenderBackgroundInputPropsType) {
  return (
    <div
      className="dnd-element"
      id={item.id}
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        dragStart(item.id, draggedElement);
      }}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        draggedElement.current &&
          handleDrag(
            item.id,
            draggedElement.current,
            getDragDirection(e) ?? "before"
          );
        removeDirectionClasses(e);
      }}
    >
      <BackgroundBlock
        id={item.id}
        groupId={groupId}
        isLayerHidden={item.isHidden}
        isDefaultData={item.isDefaultData}
        isAccordionOpen={item.isAccordionOpen}
        dropdownValue={item.repeat}
        layerGroups={groups}
        layoutListLength={layoutListLength}
        editBackgroundValue={editBackgroundValue}
        deleteLayer={deleteLayer}
        cloneLayer={cloneLayer}
        toggleAccordion={toggleAccordion}
        toggleVisibility={toggleVisibility}
        addGroup={addGroup}
        moveToGroup={moveToGroup}
        clearGroup={clearGroup}
        deleteGroup={deleteGroup}
        layerRegistry={layerRegistry}
      />
    </div>
  );
}
