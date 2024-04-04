import { ReactNode, useState } from "react";
import { BackgroundInput } from "./store";
import classnames from "classnames";
import "./Accordion.css";
import { Tooltip } from "react-tooltip";

type AccordionProps = {
    headerContent: ReactNode;
    backgroundId: BackgroundInput['id'];
    children: ReactNode;
    isLayerHidden?: boolean;
}

export default function Accordion (props: AccordionProps) {
    const { headerContent, children, isLayerHidden } = props;
    const [isOpen, setOpen] = useState(true);
    return (
        <div className="accordion-container">
            <div className="accordion-header">
                <div className={classnames("opacity-overlay", {"show-overlay": isLayerHidden})}></div>
                <div className="acc-header-content">
                    {headerContent}
                </div>
                <button 
                    type="button" 
                    className="btn btn-secondary accordion-btn" 
                    onClick={() => setOpen(!isOpen)}
                    data-tooltip-id="accordion-toggle" 
                    data-tooltip-content={isOpen ? 'Hide bg configs' : 'Show bg configs'}
                >
                    <span className={classnames("arrow-btn", {'up': isOpen, 'down': !isOpen})} />
                </button>
                <Tooltip id="accordion-toggle" />
            </div>
            <div className={classnames("accordion-body", {collapsed: !isOpen, "hidden" : isLayerHidden})}>
                {children}
            </div>
        </div>
    );
}