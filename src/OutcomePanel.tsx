import Preview from "./Preview";
import OutcomeCodeBlock from "./OutcomeCodeBlock";
import './OutcomePanel.css';

export default function OutcomePanel() {
    return (
        <div className="panel-container">
            <Preview />
            <OutcomeCodeBlock />
        </div>
    );
}