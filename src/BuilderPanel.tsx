import { BackgroundInput, useGradientStore } from './store';
import CodeInput from "./CodeInput";
import "./BuilderPanel.css";
import "./NumberInput.css";
import NumberInput from './NumberInput';

export default function BuilderPanel() {
    const backgroundInputs = useGradientStore((state) => state.backgroundInputs);
    const isBorderShown = useGradientStore((state) => state.isBorderShown);
    const editCheckboxValue = useGradientStore((state) => state.editCheckboxValue);
    const addBackgroundLayer = useGradientStore((state) => state.addBackgroundLayer);

    const renderBackgroundInputs = (items: BackgroundInput[]) => {
        return items.map(item => {
            return <CodeInput key={item.id} id={item.id} />
        });
    };

    return (
        <div className="panel-container">
            <NumberInput key="number-input-width" inputName="width" unit="rem" />
            <NumberInput key="number-input-height" inputName="height" unit="rem" />
            <div className="number-input-container">
                <div className="number-input-label">border visible: </div>
                <input 
                    type="checkbox"
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={editCheckboxValue}
                    checked={!!isBorderShown} 
                />
            </div>
            <NumberInput key="number-input-border-width" inputName="borderWidth" unit="px" />
            {renderBackgroundInputs(backgroundInputs)}
            <button 
                className="btn btn-primary add-bg-layer-btn"
                onClick={addBackgroundLayer}
            >
                add layer
            </button>
        </div>
    );
}