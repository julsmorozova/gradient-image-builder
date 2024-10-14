import { ReactNode } from "react";
import classnames from "classnames";
import "./Accordion.css";
import { Tooltip } from "react-tooltip";

type AccordionProps = {
  headerContent: ReactNode;
  children: ReactNode;
  isLayerHidden?: boolean;
  isOpen?: boolean;
  onToggle: () => void;
  customShowTooltipLabel?: string;
  customHideTooltipLabel?: string;
  draggable: boolean;
  isGroup?: boolean;
};

export default function Accordion(props: AccordionProps) {
  const {
    headerContent,
    children,
    isLayerHidden,
    isOpen,
    onToggle,
    customShowTooltipLabel,
    customHideTooltipLabel,
    draggable,
    isGroup,
  } = props;
  return (
    <div className="accordion-container">
      <div
        className={classnames({ "accordion-header": true, group: isGroup })}
        draggable={draggable}
      >
        <div
          className={classnames("opacity-overlay", {
            "show-overlay": isLayerHidden,
          })}
        ></div>
        <div className="acc-header-content">{headerContent}</div>
        <button
          type="button"
          className="btn btn-secondary accordion-btn"
          onClick={onToggle}
          data-tooltip-id="accordion-toggle"
          data-tooltip-content={
            isOpen
              ? customHideTooltipLabel ?? "Hide bg configs"
              : customShowTooltipLabel ?? "Show bg configs"
          }
        >
          <span
            className={classnames("arrow-btn", { up: isOpen, down: !isOpen })}
          />
        </button>
        <Tooltip id="accordion-toggle" />
      </div>
      <div
        className={classnames("accordion-body", {
          collapsed: !isOpen,
          hidden: isLayerHidden,
        })}
      >
        {children}
      </div>
    </div>
  );
}
