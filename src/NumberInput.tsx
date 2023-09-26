import { useGradientStore, GradientObjectState } from './store';
import { editDisplayStylePropName } from './tools';
import "./NumberInput.css";

type NumberInputProps = {
    inputName: keyof Pick<GradientObjectState, 'height' | 'width' | 'borderWidth'>;
    unit: 'rem' | 'px';
}

export default function NumberInput ( props: NumberInputProps ) {
    const { inputName, unit } = props;
    const editValue = useGradientStore((state) => state.editGradientObjectValue);
    const inputValue = useGradientStore((state) => state[inputName]);
    return (
        <div className="number-input-container">
            <div className="number-input-label">{editDisplayStylePropName(inputName)}: </div>
            <div className="number-input-input-wrapper">
                <input 
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={(e) => editValue({ [inputName]: Number(e.currentTarget.value) })}
                    value={inputValue} 
                /> 
                <span className="number-input-unit">{unit}</span>
            </div>
        </div>
    );
}