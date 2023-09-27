import { BackgroundInput, useGradientStore } from './store';
import GradientBlock from "./GradientBlock";
import NumberInput from './NumberInput';
import { useRef } from 'react';
import "./BuilderPanel.css";
import "./NumberInput.css";

export default function BuilderPanel() {
    const backgroundInputs = useGradientStore((state) => state.backgroundInputs);
    const isBorderShown = useGradientStore((state) => state.isBorderShown);
    const editCheckboxValue = useGradientStore((state) => state.editCheckboxValue);
    const addBackgroundLayer = useGradientStore((state) => state.addBackgroundLayer);
    const updateBackgroundInputs = useGradientStore((state) => state.updateBackgroundInputs);

    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    const dragStart = (index: number) => {
        dragItem.current = index;
    };

    const dragEnter = (index: number) => {
        dragOverItem.current = index;
    };

    const handleSort = () => {
        const copiedBackgrounds = [...backgroundInputs];
        const dragItemContent = copiedBackgrounds.splice(dragItem.current, 1)[0];
        copiedBackgrounds.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        console.log("copiedBackgrounds: ", copiedBackgrounds); // TODO remove
        updateBackgroundInputs(copiedBackgrounds);
    };

    const renderBackgroundInputs = (items: BackgroundInput[]) => {
        return items.map((item, index) => {
            return (
                <div 
                    key={index} 
                    draggable 
                    onDragStart={() => dragStart(index)}
                    onDragEnter={() => dragEnter(index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <GradientBlock key={item.id} id={item.id} />
                </div>
            );
        });
    };

    return (
        <div className="panel-container">
            <NumberInput key="number-input-width" inputName="width" unit="rem" maxValue={50} />
            <NumberInput key="number-input-height" inputName="height" unit="rem" maxValue={34} />
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
            <NumberInput key="number-input-border-width" inputName="borderWidth" unit="px" maxValue={10} />
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