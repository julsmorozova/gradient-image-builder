import { useId } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import {
  BackgroundGroupType,
  BackgroundInput,
  GradientObjectAction,
} from "./store";
import "./IconMenu.css";
import classNames from "classnames";

type IconMenuProps = {
  backgroundId: BackgroundInput["id"];
  items: Partial<BackgroundGroupType>[];
  onSelect: GradientObjectAction["moveToGroup"];
  onNewItemSelect: () => void;
  onMenuBtnClick: () => void;
  onLayerClear: GradientObjectAction["clearGroup"];
  onLayerDelete: GradientObjectAction["deleteGroup"];

  isMenuOpen: boolean;
  btnIconClassName: string;
  newItemIconClassName: string;
  newItemLabel: string;
  selectedElementId?: string;
  tooltipId: string;
  tooltipContent: string;
  tooltipPlace?: PlacesType;
};

export default function IconMenu({
  backgroundId,
  items,
  onSelect,
  onNewItemSelect,
  onMenuBtnClick,
  onLayerClear,
  onLayerDelete,
  isMenuOpen,
  btnIconClassName,
  newItemIconClassName,
  newItemLabel,
  selectedElementId,
  tooltipId,
  tooltipContent,
  tooltipPlace,
}: IconMenuProps) {
  const uniqueId = useId();
  const tooltipUniqueId = uniqueId + "-" + tooltipId;

  const renderMenuItems = (
    items: Partial<BackgroundGroupType>[],
    selectedElementId: string | undefined,
    action: (layerId: string, groupId: string) => void,
    backgroundId: string
  ) => {
    return items?.map((i, index) => {
      const isSelected = i.id === selectedElementId;
      const handleClearClick = () => {
        if (i.id) {
          onLayerClear(i.id);
        }
      };
      const handleDeleteClick = () => {
        if (i.id) {
          onLayerDelete(i.id);
        }
      };
      return (
        <div
          key={uniqueId + "-" + index + "-menu-item"}
          className="menu-item-wrapper"
        >
          {isSelected && <span className="check-icon" />}
          <li
            className="icon-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              action(backgroundId, i.id as string);
              onMenuBtnClick();
            }}
          >
            {i.name}
          </li>
          <div className="button-wrapper">
            <button
              className="btn btn-secondary btn-icon-menu delete-group"
              onClick={handleDeleteClick}
              data-tooltip-id="delete-group"
              data-tooltip-content="This will delete the group and the items within"
            >
              <span id="btn-delete">x</span>
            </button>
            <Tooltip id="delete-group" />
            <button
              className="btn btn-secondary btn-icon-menu clear-group"
              onClick={handleClearClick}
              data-tooltip-id="clear-group"
              data-tooltip-content="This will clear the group without deleting the items"
            >
              <span id="btn-clear" className="clear-icon" />
            </button>
            <Tooltip id="clear-group" />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="icon-menu">
      <button
        className="btn btn-secondary icon-menu-button"
        type="button"
        onClick={onMenuBtnClick}
        data-tooltip-id={tooltipUniqueId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place={tooltipPlace}
      >
        <span className={btnIconClassName} />
      </button>
      <Tooltip id={tooltipUniqueId} />
      <ul
        className={classNames("icon-menu-dropdown", { collapsed: !isMenuOpen })}
      >
        {renderMenuItems(items, selectedElementId, onSelect, backgroundId)}
        <li
          id="new-item"
          key={uniqueId + "-" + "icon-menu-new-item"}
          onClick={onNewItemSelect}
        >
          <span className={newItemIconClassName} />
          {newItemLabel}
        </li>
      </ul>
    </div>
  );
}
