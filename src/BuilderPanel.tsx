import { BackgroundInput, useGradientStore } from './store';
import BackgroundBlock from "./BackgroundBlock";
import NumberInput from './NumberInput';
import { useRef } from 'react';
import "./BuilderPanel.css";
import { Tooltip } from 'react-tooltip';
import { editDisplayStylePropName } from './tools';

export default function BuilderPanel() {
    const backgroundInputs = useGradientStore((state) => state.backgroundInputs);
    const isBorderShown = useGradientStore((state) => state.isBorderShown);
    const editCheckboxValue = useGradientStore((state) => state.editCheckboxValue);
    const addBackgroundLayer = useGradientStore((state) => state.addBackgroundLayer);
    const updateBackgroundInputs = useGradientStore((state) => state.updateBackgroundInputs);

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const dragStart = (index: number) => {
        dragItem.current = index;
    };

    const dragEnter = (index: number) => {
        dragOverItem.current = index;
    };

    const handleSort = () => {
        const copiedBackgrounds = [...backgroundInputs];
        const dragItemContent = dragItem.current !== null && copiedBackgrounds.splice(dragItem.current, 1)[0];
        dragOverItem.current !== null && dragItemContent && copiedBackgrounds.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
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
                    <BackgroundBlock key={item.id} id={item.id} />
                </div>
            );
        });
    };

    return (
        <div className="panel-container builder-panel">
            <div className="control-panel">
                <button
                    id="clear-data-btn" 
                    className="builder-panel btn btn-secondary clear-data-btn" 
                    onClick={ () => useGradientStore.persist.clearStorage()}
                    data-tooltip-id="clear-data" 
                    data-tooltip-content="Clear stored data"
                >
                    <div className="clear-icon" />
                </button>
                <Tooltip id="clear-data" />
            </div>
            <div className="biulder-panel-row number-input-container">
                <div className="number-input-label">{editDisplayStylePropName('width')}: </div>
                <div className="number-input-input-wrapper">
                    <NumberInput key="number-input-width" inputName="width" unit="rem" maxValue={50} />
                </div>
            </div>
            <div className="biulder-panel-row number-input-container">
                <div className="number-input-label">{editDisplayStylePropName('height')}: </div>
                <div className="number-input-input-wrapper">
                    <NumberInput key="number-input-height" inputName="height" unit="rem" maxValue={34} />
                </div>
            </div>
            <div className="biulder-panel-row number-input-container border-row">
                <div className="number-input-label">border visible: </div>
                <div className="number-input-input-wrapper">
                    <input 
                        type="checkbox"
                        data-gramm="false" 
                        data-gramm_editor="false" 
                        data-enable-grammarly="false" 
                        onChange={editCheckboxValue}
                        checked={!!isBorderShown} 
                    />
                </div>
                <div className="number-input-label border-width">{editDisplayStylePropName('width')}: </div>
                <div className="number-input-input-wrapper">
                    <NumberInput key="number-input-border-width" inputName="borderWidth" unit="px" maxValue={10} />
                </div>
            </div>
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