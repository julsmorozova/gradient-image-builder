import { MutableRefObject, useRef } from "react";
import Accordion from "./Accordion";
import BackgroundBlock from "./BackgroundBlock";
import {
  BackgroundGroupType,
  BackgroundInput,
  GradientObjectAction,
  useGradientStore,
} from "./store";
import { dragStart, dragEnter, handleSort } from "./tools";

type BackgroundGroupProps = {
  id: BackgroundGroupType["id"];
  name: BackgroundGroupType["name"];
  items: BackgroundInput[];
  isGroupOpen?: boolean;
  groupChildrenIdsArray: BackgroundGroupType["childrenIds"];
  onAccordionToggle: GradientObjectAction["toggleGroupAccordion"];
};
const renderBackgroundInputs = (
  backgroundInputs: BackgroundInput[],
  id: BackgroundGroupType["id"],
  dragItem: MutableRefObject<number | null>,
  dragOverItem: MutableRefObject<number | null>,
  updateGroupChildren: CallableFunction,
  groupChildrenIdsArray: BackgroundGroupType["childrenIds"]
) => {
  return backgroundInputs.map((i, index) => {
    return (
      <div
        key={index}
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          dragStart(index, dragItem);
        }}
        onDragEnter={(e) => {
          e.stopPropagation();
          dragEnter(index, dragOverItem);
        }}
        onDragEnd={(e) => {
          console.log("before drag and drop", backgroundInputs);
          e.stopPropagation();
          handleSort(
            backgroundInputs,
            dragItem,
            dragOverItem,
            updateGroupChildren,
            groupChildrenIdsArray,
            id
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <BackgroundBlock key={i.id} id={i.id} />
      </div>
    );
  });
};
export default function BackgroundGroup({
  id,
  name,
  items,
  isGroupOpen,
  onAccordionToggle,
  groupChildrenIdsArray,
}: BackgroundGroupProps) {
  const updateGroupChildren = useGradientStore(
    (state) => state.updateGroupChildren
  );

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  return (
    items && (
      <div className="background-group">
        <Accordion
          isOpen={isGroupOpen}
          onToggle={() => onAccordionToggle(id)}
          isLayerHidden={false}
          headerContent={
            <div className="background-group-name">
              <span className="folder-icon"></span>
              {name}
            </div>
          }
          customHideTooltipLabel="Hide group layers"
          customShowTooltipLabel="Show group layers"
        >
          {renderBackgroundInputs(
            items,
            id,
            dragItem,
            dragOverItem,
            updateGroupChildren,
            groupChildrenIdsArray
          )}
        </Accordion>
      </div>
    )
  );
}
