import { MutableRefObject } from "react";
import RenderBackgroundInput from "./RenderBackgroundInput";
import RenderGroup from "./RenderGroup";
import {
  GradientObjectAction,
  GradientObjectState,
  isString,
  LayoutGroup,
} from "./store";

type RenderLayoutItemProps = {
  item: string | LayoutGroup;
  layout: GradientObjectState["layout"];
  groupRegistry: GradientObjectState["groupRegistry"];
  editBackgroundValue: GradientObjectAction["editBackgroundValue"];
  handleDrag: GradientObjectAction["handleDrag"];
  toggleGroupAccordion: GradientObjectAction["toggleGroupAccordion"];
  layerRegistry: GradientObjectState["layerRegistry"];
  draggedElement: MutableRefObject<string | null>;
  deleteLayer: GradientObjectAction["deleteLayer"];
  cloneLayer: GradientObjectAction["cloneLayer"];
  moveToGroup: GradientObjectAction["moveToGroup"];
  addGroup: GradientObjectAction["addGroup"];
  clearGroup: GradientObjectAction["clearGroup"];
  deleteGroup: GradientObjectAction["deleteGroup"];
  toggleAccordion: GradientObjectAction["toggleGroupAccordion"];
  toggleVisibility: GradientObjectAction["toggleLayerVisibility"];
};

export const RenderLayoutItem = ({
  item,
  layerRegistry,
  groupRegistry,
  layout,
  draggedElement,
  editBackgroundValue,
  handleDrag,
  toggleGroupAccordion,
  deleteLayer,
  cloneLayer,
  toggleVisibility,
  toggleAccordion,
  addGroup,
  moveToGroup,
  clearGroup,
  deleteGroup,
}: RenderLayoutItemProps) => {
  return isString(item) ? (
    <RenderBackgroundInput
      item={layerRegistry[item]}
      groups={Object.values(groupRegistry)}
      layoutListLength={layout.length}
      editBackgroundValue={editBackgroundValue}
      handleDrag={handleDrag}
      draggedElement={draggedElement}
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
  ) : (
    <RenderGroup
      group={groupRegistry[item?.id]}
      items={item.children}
      groups={Object.values(groupRegistry)}
      layoutListLength={layout.length}
      toggleGroupAccordion={toggleGroupAccordion}
      editBackgroundValue={editBackgroundValue}
      handleDrag={handleDrag}
      layerRegistry={layerRegistry}
      draggedElement={draggedElement}
      deleteLayer={deleteLayer}
      cloneLayer={cloneLayer}
      toggleAccordion={toggleAccordion}
      toggleVisibility={toggleVisibility}
      addGroup={addGroup}
      moveToGroup={moveToGroup}
      clearGroup={clearGroup}
      deleteGroup={deleteGroup}
    />
  );
};
