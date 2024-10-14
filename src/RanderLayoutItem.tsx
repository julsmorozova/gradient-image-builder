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
}: RenderLayoutItemProps) => {
  return isString(item) ? (
    <RenderBackgroundInput
      item={layerRegistry[item]}
      groups={Object.values(groupRegistry)}
      layoutListLength={layout.length}
      editBackgroundValue={editBackgroundValue}
      handleDrag={handleDrag}
      draggedElement={draggedElement}
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
    />
  );
};
