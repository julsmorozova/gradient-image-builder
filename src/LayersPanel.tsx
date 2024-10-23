import { useRef } from "react";

import {
  GroupRegistry,
  isString,
  LayerRegistry,
  Layout,
  useGradientStore,
} from "./store";
import { RenderLayoutItem } from "./RenderLayoutItem";

export default function LayersPanel() {
  const groupRegistry: GroupRegistry = useGradientStore(
    (state) => state.groupRegistry
  );
  const layerRegistry: LayerRegistry = useGradientStore(
    (state) => state.layerRegistry
  );
  const layout: Layout = useGradientStore((state) => state.layout);

  const toggleGroupAccordion = useGradientStore(
    (state) => state.toggleGroupAccordion
  );
  const addBackgroundLayer = useGradientStore(
    (state) => state.addBackgroundLayer
  );
  const editBackgroundValue = useGradientStore(
    (state) => state.editBackgroundValue
  );
  const deleteLayer = useGradientStore((state) => state.deleteLayer);
  const cloneLayer = useGradientStore((state) => state.cloneLayer);
  const toggleVisibility = useGradientStore(
    (state) => state.toggleLayerVisibility
  );
  const moveToGroup = useGradientStore((state) => state.moveToGroup);
  const addGroup = useGradientStore((state) => state.addGroup);
  const clearGroup = useGradientStore((state) => state.clearGroup);
  const deleteGroup = useGradientStore((state) => state.deleteGroup);
  const toggleAccordion = useGradientStore((state) => state.toggleAccordion);

  const handleDrag = useGradientStore((state) => state.handleDrag);

  const draggedElement = useRef<string | null>(null);

  return (
    <div>
      {layout.map((item) => (
        <RenderLayoutItem
          item={item}
          key={isString(item) ? item : item.id}
          layout={layout}
          layerRegistry={layerRegistry}
          groupRegistry={groupRegistry}
          editBackgroundValue={editBackgroundValue}
          handleDrag={handleDrag}
          toggleGroupAccordion={toggleGroupAccordion}
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
      ))}
      <div className="button-wrapper">
        <button
          className="btn btn-primary add-bg-layer-btn"
          onClick={() => addBackgroundLayer()}
        >
          add layer
        </button>
      </div>
    </div>
  );
}
