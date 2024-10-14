import { useGradientStore } from "./store";
import NumberInput from "./NumberInput";
import { useId, useState } from "react";
import "./BuilderPanel.css";
import { Tooltip } from "react-tooltip";
import { editDisplayStylePropName } from "./tools";
import classNames from "classnames";
import LayersPanel from "./LayersPanel";

export default function BuilderPanel() {
  const isBorderShown = useGradientStore((state) => state.isBorderShown);

  const [showGroupItems, setShowGroupItems] = useState(false);
  const editCheckboxValue = useGradientStore(
    (state) => state.editCheckboxValue
  );

  const id = useId();

  return (
    <div className="panel-container builder-panel">
      <div className="control-panel">
        <button
          id="toggle-group-visibility"
          className="builder-panel btn btn-secondary"
          onClick={() => setShowGroupItems(!showGroupItems)}
          data-tooltip-id="group-items-visibility"
          data-tooltip-content={
            showGroupItems ? "Collapse groups" : "Open groups"
          }
        >
          <div
            className={classNames({
              "folder-icon": !showGroupItems,
              "no-groups-icon": showGroupItems,
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
          <NumberInput inputName="width" unit="rem" maxValue={50} />
        </div>
      </div>
      <div className="biulder-panel-row number-input-container">
        <div className="number-input-label">
          {editDisplayStylePropName("height")}:{" "}
        </div>
        <div className="number-input-input-wrapper">
          <NumberInput inputName="height" unit="rem" maxValue={34} />
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
          <NumberInput inputName="borderWidth" unit="px" maxValue={10} />
        </div>
      </div>
      <LayersPanel />
    </div>
  );
}
