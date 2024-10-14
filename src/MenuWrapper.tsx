import { useEffect, useRef, useState } from "react";
import IconMenu from "./IconMenu";
import { createPortal } from "react-dom";
import {
  BackgroundGroupType,
  BackgroundInput,
  GradientObjectAction,
} from "./store";
import { PlacesType } from "react-tooltip";
import { Modal } from "./Modal";

type MenuWrapperProps = {
  onSelectAction: GradientObjectAction["moveToGroup"];
  addGroup: GradientObjectAction["addGroup"];
  clearGroup: GradientObjectAction["clearGroup"];
  deleteGroup: GradientObjectAction["deleteGroup"];
  backgroundId: BackgroundInput["id"];
  items: Partial<BackgroundGroupType>[];
  btnIconClassName: string;
  newItemIconClassName: string;
  newItemLabel: string;
  selectedElementId?: string;
  tooltipId: string;
  tooltipContent: string;
  tooltipPlace?: PlacesType;
};

export default function MenuWrapper({
  onSelectAction,
  backgroundId,
  items,
  btnIconClassName,
  newItemIconClassName,
  newItemLabel,
  selectedElementId,
  tooltipContent,
  tooltipId,
  tooltipPlace,
  addGroup,
  clearGroup,
  deleteGroup,
}: MenuWrapperProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onCancel = () => setModalOpen(false);
    const handleClickOutside = (e: Event) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <IconMenu
        backgroundId={backgroundId}
        onMenuBtnClick={() => setMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onSelect={onSelectAction}
        onNewItemSelect={() => setModalOpen(true)}
        onLayerDelete={deleteGroup}
        onLayerClear={clearGroup}
        items={items}
        selectedElementId={selectedElementId}
        btnIconClassName={btnIconClassName}
        newItemIconClassName={newItemIconClassName}
        newItemLabel={newItemLabel}
        tooltipId={tooltipId}
        tooltipContent={tooltipContent}
        tooltipPlace={tooltipPlace}
      />
      {isModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <Modal
              layerId={backgroundId}
              title="Add new group"
              onCancel={() => setModalOpen(false)}
              onSave={addGroup}
              ref={modalRef}
            />
          </div>,
          document.body
        )}
    </>
  );
}
