import GradientInput from "./GradientInput";
import "./BackgroundBlock.css";
import {
  BackgroundGroupType,
  GradientObjectAction,
  useGradientStore,
} from "./store";
import BackgroundBlockDropdown from "./BackgroundBlockDropdown";
import Accordion from "./Accordion";
import { Tooltip } from "react-tooltip";
import classnames from "classnames";
import ColorsThumbnail from "./ColorsThumbnail";
import MenuWrapper from "./MenuWrapper";

type BackgroundBlockProps = {
  id: string;
  groupId?: string;
  isLayerHidden: boolean;
  isDefaultData: boolean;
  isAccordionOpen: boolean;
  dropdownValue?: string;
  layerGroups: BackgroundGroupType[];
  layoutListLength: number;
  editBackgroundValue: GradientObjectAction["editBackgroundValue"];
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
  const {
    id,
    groupId,
    isLayerHidden,
    isDefaultData,
    isAccordionOpen,
    dropdownValue,
    layerGroups,
    layoutListLength,
    editBackgroundValue,
  } = props;

  const deleteBackgroundLayer = useGradientStore((state) => state.deleteLayer);
  const cloneLayer = useGradientStore((state) => state.cloneLayer);
  const toggleVisibility = useGradientStore(
    (state) => state.toggleLayerVisibility
  );
  const moveToGroup = useGradientStore((state) => state.moveToGroup);
  const addGroup = useGradientStore((state) => state.addGroup);
  const clearGroup = useGradientStore((state) => state.clearGroup);
  const deleteGroup = useGradientStore((state) => state.deleteGroup);
  const toggleAccordion = useGradientStore((state) => state.toggleAccordion);

  const layerRegistry = useGradientStore((state) => state.layerRegistry);

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
        draggable
        isGroup={!!groupId}
        headerContent={
          <>
            <div className="bg-value-container row">
              <div className="code-input-label">
                <ColorsThumbnail id={id} />
              </div>
              <div className="bg-block-input-wrapper gradient-identifier">
                <GradientInput
                  // key={`${id}-gradient-name`}
                  isStringInput
                  backgroundId={id}
                  backgroundPropName="name"
                  backgroundValue={layerRegistry[id]["name"]}
                  isValueRelative
                  editBackgroundValue={editBackgroundValue}
                />
                <div className="code-input-wrapper btn-wrapper">
                  <button
                    disabled={layoutListLength === 1}
                    className="btn btn-secondary delete-bg-layer-btn"
                    onClick={() => deleteBackgroundLayer(id)}
                    data-tooltip-id="delete-layer"
                    data-tooltip-content="Remove layer"
                  >
                    x
                  </button>
                  {layoutListLength > 1 && <Tooltip id="delete-layer" />}
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
              </div>
              <div className="bg-block-input-wrapper">
                <GradientInput
                  // key={`${id}-value`}
                  isStringInput
                  isTextarea
                  backgroundId={id}
                  backgroundPropName="value"
                  backgroundValue={layerRegistry[id]["value"]}
                  isValueRelative
                  editBackgroundValue={editBackgroundValue}
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
                  <MenuWrapper
                    backgroundId={id}
                    onSelectAction={moveToGroup}
                    addGroup={addGroup}
                    clearGroup={clearGroup}
                    deleteGroup={deleteGroup}
                    items={layerGroups}
                    selectedElementId={groupId}
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
              // key={`${id}-x`}
              backgroundId={id}
              backgroundPropName="x"
              backgroundValue={layerRegistry[id]["x"]}
              isValueRelative
              isNegativeValAllowed
              editBackgroundValue={editBackgroundValue}
            />
            <GradientInput
              // key={`${id}-y`}
              backgroundId={id}
              backgroundPropName="y"
              backgroundValue={layerRegistry[id]["y"]}
              isValueRelative
              isNegativeValAllowed
              editBackgroundValue={editBackgroundValue}
            />
          </div>
          <div className="bg-size-container row row-secondary">
            <div className="code-input-label label">{"size: "}</div>
            <GradientInput
              // key={`${id}-w`}
              backgroundId={id}
              backgroundPropName="w"
              backgroundValue={layerRegistry[id]["w"]}
              isValueRelative
              editBackgroundValue={editBackgroundValue}
            />
            <GradientInput
              // key={`${id}-h`}
              backgroundId={id}
              backgroundPropName="h"
              backgroundValue={layerRegistry[id]["h"]}
              isValueRelative
              editBackgroundValue={editBackgroundValue}
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
