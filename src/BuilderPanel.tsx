import { GroupRegistry, LayerRegistry, useGradientStore } from "./store";
import NumberInput from "./NumberInput";
import { useId, useState } from "react";
import "./BuilderPanel.css";
import { Tooltip } from "react-tooltip";
import { editDisplayStylePropName } from "./tools";
import classNames from "classnames";
import LayersPanel from "./LayersPanel";

export default function BuilderPanel() {
  const isBorderShown = useGradientStore((state) => state.isBorderShown);
  const width = useGradientStore((state) => state.width);
  const height = useGradientStore((state) => state.height);
  const borderWidth = useGradientStore((state) => state.borderWidth);
  const groups = useGradientStore((state) => state.groupRegistry);
  const layers = useGradientStore((state) => state.layerRegistry);

  const [showGroupItems, setShowGroupItems] = useState(
    allItemsOpen(groups) ? true : false
  );
  const [showLayersConfigs, setShowLayersConfigs] = useState(
    allItemsOpen(layers) ? true : false
  );
  const editCheckboxValue = useGradientStore(
    (state) => state.editCheckboxValue
  );

  const editValue = useGradientStore((state) => state.editGradientObjectValue);

  function allItemsOpen(items: GroupRegistry | LayerRegistry): boolean {
    return Object.values(items).every((g) => g.isAccordionOpen === true);
  }

  const toggleGroupAccordion = useGradientStore(
    (state) => state.toggleGroupAccordion
  );

  const toggleLayerAccordion = useGradientStore(
    (state) => state.toggleAccordion
  );

  function handleCollapseGroupsToggle(groups: GroupRegistry) {
    if (allItemsOpen(groups) && !showGroupItems) {
      return;
    }
    setShowGroupItems(!showGroupItems);
    Object.keys(groups).map((i) => {
      toggleGroupAccordion(i, showGroupItems ? false : true);
    });
  }

  function handleCollapseLayersToggle(layers: LayerRegistry) {
    if (allItemsOpen(layers) && !showLayersConfigs) {
      return;
    }
    setShowLayersConfigs(!showLayersConfigs);
    Object.keys(layers).map((i) => {
      toggleLayerAccordion(i, showLayersConfigs ? false : true);
    });
  }

  const id = useId();

  return (
    <div className="panel-container builder-panel">
      <div className="control-panel">
        <button
          id="toggle-layer-configs-visibility"
          className="builder-panel btn btn-secondary"
          onClick={() => handleCollapseLayersToggle(layers)}
          data-tooltip-id="layers-configs-visibility"
          data-tooltip-content={
            showLayersConfigs
              ? "Hide all layers' configs"
              : "Show all layers' configs"
          }
        >
          <div
            className={classNames({
              "hide-config-icon": showLayersConfigs,
              "config-icon": !showLayersConfigs,
            })}
          />
        </button>
        <Tooltip id="layers-configs-visibility" />
        <button
          id="toggle-group-visibility"
          className="builder-panel btn btn-secondary"
          onClick={() => handleCollapseGroupsToggle(groups)}
          data-tooltip-id="group-items-visibility"
          data-tooltip-content={
            showGroupItems ? "Hide all group items" : "Show all group items"
          }
        >
          <div
            className={classNames({
              "folder-icon": showGroupItems,
              "group-items-icon": !showGroupItems,
            })}
          />
        </button>
        <Tooltip id="group-items-visibility" />
        <button
          id="clear-data-btn"
          className="builder-panel btn btn-secondary clear-data-btn"
          onClick={() => useGradientStore.persist.clearStorage()}
          data-tooltip-id="clear-data"
          data-tooltip-content="Clear stored data"
        >
          <div className="clear-icon" />
        </button>
        <Tooltip id="clear-data" />
      </div>
      <div className="biulder-panel-row number-input-container">
        <div className="number-input-label">
          {editDisplayStylePropName("width")}:{" "}
        </div>
        <div className="number-input-input-wrapper">
          <NumberInput
            inputName="width"
            unit="rem"
            maxValue={50}
            inputValue={width}
            editValue={editValue}
          />
        </div>
      </div>
      <div className="biulder-panel-row number-input-container">
        <div className="number-input-label">
          {editDisplayStylePropName("height")}:{" "}
        </div>
        <div className="number-input-input-wrapper">
          <NumberInput
            inputName="height"
            unit="rem"
            maxValue={34}
            inputValue={height}
            editValue={editValue}
          />
        </div>
      </div>
      <div className="biulder-panel-row number-input-container border-row">
        <div className="number-input-label">border visible: </div>
        <div className="number-input-input-wrapper">
          <input
            id={id + "-border-shown-checkbox"}
            type="checkbox"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            onChange={editCheckboxValue}
            checked={!!isBorderShown}
          />
        </div>
        <div className="number-input-label border-width">
          {editDisplayStylePropName("width")}:{" "}
        </div>
        <div className="number-input-input-wrapper">
          <NumberInput
            inputName="borderWidth"
            unit="px"
            maxValue={10}
            inputValue={borderWidth}
            editValue={editValue}
          />
        </div>
      </div>
      <LayersPanel />
    </div>
  );
}
