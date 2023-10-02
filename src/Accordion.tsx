import { ReactNode } from "react";
import { BackgroundInput, useGradientStore } from "./store";
import classnames from "classnames";
import "./Accordion.css";
import { Tooltip } from "react-tooltip";

type AccordionProps = {
    headerContent: ReactNode;
    backgroundId: BackgroundInput['id'];
    children: ReactNode;
}

export default function Accordion (props: AccordionProps) {
    const { headerContent, backgroundId, children } = props;
    const setAccordionOpen = useGradientStore((state) => state.editBackgroundValue);
    const isAccordionOpen = useGradientStore((state) => state.backgroundInputs.find(i => i.id === backgroundId)?.['isAccordionOpen']);
    return (
        <div className="accordion-container">
            <div className="accordion-header">
                <div className="acc-header-content">
                    {headerContent}
                </div>
                <button 
                    type="button" 
                    className="btn btn-secondary accordion-btn" 
                    onClick={() => setAccordionOpen(backgroundId, 'isAccordionOpen', !isAccordionOpen)}
                    data-tooltip-id="accordion-toggle" 
                    data-tooltip-content={isAccordionOpen ? 'Hide bg configs' : 'Show bg configs'}
                >
                    <span className={classnames("arrow-btn", {'up': isAccordionOpen, 'down': !isAccordionOpen})} />
                </button>
                <Tooltip id="accordion-toggle" />
            </div>
            <div className={classnames("accordion-body", {collapsed: !isAccordionOpen})}>
                {children}
            </div>
        </div>
    );
}