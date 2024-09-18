import GradientInput from "./GradientInput";
import "./BackgroundBlock.css";
import { useGradientStore } from "./store";
import BackgroundBlockDropdown from "./BackgroundBlockDropdown";
import Accordion from "./Accordion";
import { Tooltip } from "react-tooltip";
import classnames from "classnames";
import ColorsThumbnail from "./ColorsThumbnail";
import MenuWrapper from "./MenuWrapper";

type BackgroundBlockProps = {
  id: string;
};

const repeatOptions = [
  {
    id: 0,
    name: "noRepeat",
    value: "no-repeat",
  },
  {
    id: 1,
    name: "repeatX",
    value: "repeat-x",
  },
  {
    id: 2,
    name: "repeatY",
    value: "repeat-y",
  },
  {
    id: 3,
    name: "repeat",
    value: "repeat",
  },
  {
    id: 4,
    name: "space",
    value: "space",
  },
  {
    id: 5,
    name: "round",
    value: "round",
  },
];

export default function BackgroundBlock(props: BackgroundBlockProps) {
  const id = props.id;
  const backgroundLayersLength = useGradientStore(
    (state) => state.backgroundInputs.length
  );
  const deleteBackgroundLayer = useGradientStore(
    (state) => state.deleteBackgroundLayer
  );
  const cloneLayer = useGradientStore((state) => state.cloneLayer);
  const toggleVisibility = useGradientStore(
    (state) => state.toggleLayerVisibility
  );
  const isDefaultData = useGradientStore(
    (state) => state.backgroundInputs.find((i) => i.id === id)?.isDefaultData
  );
  const isLayerHidden = useGradientStore(
    (state) => state.backgroundInputs.find((i) => i.id === id)?.isHidden
  );
  const layerGroups = useGradientStore((state) => state.backgroundGroups);
  const currentBackgroundGroupId = useGradientStore(
    (state) =>
      state.backgroundGroups.find((group) => group.childrenIds?.includes(id))
        ?.id
  );
  const editBackgroundValue = useGradientStore(
    (state) => state.editBackgroundValue
  );
  const moveToGroup = useGradientStore((state) => state.moveToGroup);
  const dropdownPropName = "repeat";
  const dropdownValue = useGradientStore(
    (state) =>
      state.backgroundInputs.find((i) => i.id === id)?.[dropdownPropName]
  );
  const toggleAccordion = useGradientStore((state) => state.toggleAccordion);
  const isAccordionOpen = useGradientStore(
    (state) =>
      state.backgroundInputs.find((i) => i.id === id)?.["isAccordionOpen"]
  );

  return (
    <div
      className={classnames("background-block-container", {
        hidden: isLayerHidden,
      })}
    >
      <Accordion
        isLayerHidden={isLayerHidden}
        isOpen={isAccordionOpen}
        onToggle={() => toggleAccordion(id)}
        headerContent={
          <>
            <div className="bg-value-container row">
              <div className="code-input-label">
                <ColorsThumbnail id={id} />
              </div>
              <div className="bg-block-input-wrapper gradient-identifier">
                <GradientInput
                  key={`${id}-gradient-name`}
                  isStringInput
                  backgroundId={id}
                  backgroundPropName="name"
                  isValueRelative
                />
                <div className="code-input-wrapper btn-wrapper">
                  <button
                    disabled={backgroundLayersLength === 1}
                    className="btn btn-secondary delete-bg-layer-btn"
                    onClick={() => deleteBackgroundLayer(id)}
                    data-tooltip-id="delete-layer"
                    data-tooltip-content="Remove layer"
                  >
                    x
                  </button>
                  {backgroundLayersLength > 1 && <Tooltip id="delete-layer" />}
                </div>
              </div>
            </div>
            <div className="bg-value-container row">
              <div className="code-input-label">
                <div
                  className={classnames("default-data-flag", {
                    show: isDefaultData,
                  })}
                >
                  default data
                </div>
              </div>
              <div className="bg-block-input-wrapper">
                <GradientInput
                  key={`${id}-value`}
                  isStringInput
                  isTextarea
                  backgroundId={id}
                  backgroundPropName="value"
                  isValueRelative
                />
                <div className="btn-wrapper">
                  <button
                    className="btn btn-secondary duplicate-bg-layer-btn"
                    onClick={() => cloneLayer(id)}
                    data-tooltip-id="clone-layer"
                    data-tooltip-content="Clone layer"
                    data-tooltip-place="left"
                  >
                    <div className="copy-icon" />
                  </button>
                  <Tooltip id="clone-layer" />
                  <button
                    className="btn btn-secondary toggle-visibility-btn"
                    onClick={() => toggleVisibility(id)}
                    data-tooltip-id="toggle-layer-visibility"
                    data-tooltip-content={
                      isLayerHidden ? "Show layer" : "Hide layer"
                    }
                    data-tooltip-place="left"
                  >
                    <div
                      className={classnames(
                        "toggle-visibility-icon",
                        { show: isLayerHidden },
                        { hide: !isLayerHidden }
                      )}
                    />
                  </button>
                  <Tooltip id="toggle-layer-visibility" />
                  <MenuWrapper
                    backgroundId={id}
                    onSelectAction={moveToGroup}
                    items={layerGroups}
                    selectedElementId={currentBackgroundGroupId}
                    btnIconClassName="move-to-folder-icon"
                    newItemIconClassName="add-folder-icon"
                    newItemLabel="Add new group"
                    tooltipId="move-layer-to-folder"
                    tooltipContent="Move layer to group"
                    tooltipPlace="left"
                  />
                </div>
              </div>
            </div>
          </>
        }
      >
        <>
          <div className="bg-position-container row row-secondary">
            <div className="code-input-label label">{"position: "}</div>
            <GradientInput
              key={`${id}-x`}
              backgroundId={id}
              backgroundPropName="x"
              isValueRelative
              isNegativeValAllowed
            />
            <GradientInput
              key={`${id}-y`}
              backgroundId={id}
              backgroundPropName="y"
              isValueRelative
              isNegativeValAllowed
            />
          </div>
          <div className="bg-size-container row row-secondary">
            <div className="code-input-label label">{"size: "}</div>
            <GradientInput
              key={`${id}-w`}
              backgroundId={id}
              backgroundPropName="w"
              isValueRelative
            />
            <GradientInput
              key={`${id}-h`}
              backgroundId={id}
              backgroundPropName="h"
              isValueRelative
            />
          </div>
          <div className="bg-size-container row row-secondary">
            <div className="code-input-label label">repeat: </div>
            <BackgroundBlockDropdown
              items={repeatOptions}
              backgroundId={id}
              backgroundPropName="repeat"
              value={dropdownValue}
              action={editBackgroundValue}
            />
          </div>
        </>
      </Accordion>
    </div>
  );
}
