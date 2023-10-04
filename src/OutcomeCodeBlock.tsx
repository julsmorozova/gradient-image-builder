import { Tooltip } from "react-tooltip";
import "./OutcomeBlock.css";
import classnames from "classnames";
import { useState } from "react";

type OutcomeCodeBlockProps = {
    outcome?: string;
}
export default function OutcomeCodeBlock(props: OutcomeCodeBlockProps) {
    const { outcome } = props; 
    const [blockShown, setBlockShown] = useState<boolean>(false);

    const handleClick = () => {
        outcome && navigator.clipboard.writeText(outcome);
    };
    
    return (
        <div className="outcome-block">
            <div className="outcome-text-wrapper">
                <div className="outcome-block-header">
                    <div className="outcome-block-label">Outcome CSS</div>
                    <button
                        id="copy-to-clipboard-btn" 
                        className="outcome-block btn btn-secondary duplicate-bg-layer-btn" 
                        onClick={handleClick}
                        data-tooltip-id="copy-to-clipboard" 
                        data-tooltip-content="Copy to clipboard"
                    >
                        <div className="copy-icon" />
                    </button>
                    <Tooltip id="copy-to-clipboard" />
                    <button 
                        type="button" 
                        className="btn btn-secondary accordion-btn" 
                        onClick={() => setBlockShown(!blockShown)}
                        data-tooltip-id="outcome-code-toggle" 
                        data-tooltip-content={blockShown ? 'Hide outcome CSS' : 'Show outcome CSS'}
                    >
                        <span className={classnames("arrow-btn", {'up': blockShown, 'down': !blockShown})} />
                    </button>
                    <Tooltip id="outcome-code-toggle" />
                </div>
                <div className={classnames("outcome-block-main", {"block-hidden": !blockShown})}>
                    {outcome}
                </div>
            </div>
        </div>
    );
}