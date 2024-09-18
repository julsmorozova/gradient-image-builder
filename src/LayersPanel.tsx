import { useRef } from "react";
import BackgroundBlock from "./BackgroundBlock";
import BackgroundGroup from "./BackgroundGroup";
import {
  BackgroundGroupType,
  BackgroundInput,
  useGradientStore,
} from "./store";
import { dragStart, dragEnter, handleSort, sortByArrayOrder } from "./tools";

export default function LayersPanel() {
  const backgroundGroups = useGradientStore((state) => state.backgroundGroups);
  const backgroundInputs = useGradientStore((state) => state.backgroundInputs);
  const backgroundInputsToShow = useGradientStore(
    (state) => state.backgroundInputs
  ).filter((i) => {
    return !backgroundGroups.some((g) => {
      return g.childrenIds?.includes(i.id);
    });
  });
  const toggleGroupAccordion = useGradientStore(
    (state) => state.toggleGroupAccordion
  );
  const updateBackgroundInputs = useGradientStore(
    (state) => state.updateBackgroundInputs
  );
  const updateGroups = useGradientStore((state) => state.updateGroups);
  const addBackgroundLayer = useGradientStore(
    (state) => state.addBackgroundLayer
  );

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const dragGroupItem = useRef<number | null>(null);
  const dragOverGroupItem = useRef<number | null>(null);

  const renderGroups = (groups: BackgroundGroupType[]) => {
    return groups.map((g, index) => {
      const sortedGroupItems = sortByArrayOrder(
        g.childrenIds,
        backgroundInputs.filter((i) => g.childrenIds?.includes(i.id))
      );
      return (
        g.childrenIds.length > 0 && (
          <div
            key={index}
            draggable
            onDragStart={() => dragStart(index, dragGroupItem)}
            onDragEnter={() => dragEnter(index, dragOverGroupItem)}
            onDragEnd={() =>
              handleSort(
                backgroundGroups,
                dragGroupItem,
                dragOverGroupItem,
                updateGroups
              )
            }
            onDragOver={(e) => e.preventDefault()}
          >
            <BackgroundGroup
              key={index}
              id={g.id}
              name={g.name}
              isGroupOpen={g.isOpen}
              onAccordionToggle={() => toggleGroupAccordion(g.id)}
              items={sortedGroupItems as BackgroundInput[]}
              groupChildrenIdsArray={g.childrenIds}
            />
          </div>
        )
      );
    });
  };
  const renderBackgroundInputs = (items: BackgroundInput[]) => {
    return items.map((item, index) => {
      return (
        <div
          key={index}
          draggable
          onDragStart={() => dragStart(index, dragItem)}
          onDragEnter={() => dragEnter(index, dragOverItem)}
          onDragEnd={() =>
            handleSort(
              backgroundInputs,
              dragItem,
              dragOverItem,
              updateBackgroundInputs
            )
          }
          onDragOver={(e) => e.preventDefault()}
        >
          <BackgroundBlock key={item.id} id={item.id} />
        </div>
      );
    });
  };
  return (
    <div>
      {renderGroups(backgroundGroups)}
      {renderBackgroundInputs(backgroundInputsToShow)}
      <div className="button-wrapper">
        <button
          className="btn btn-primary add-bg-layer-btn"
          onClick={addBackgroundLayer}
        >
          add layer
        </button>
      </div>
    </div>
  );
}
