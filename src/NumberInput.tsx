import { useGradientStore, GradientObjectState } from './store';
import "./NumberInput.css";

type NumberInputProps = {
    inputName: keyof Pick<GradientObjectState, 'height' | 'width' | 'borderWidth'>;
    unit: 'rem' | 'px' | '%';
    isValueRelative?: boolean;
    maxValue?: number;
    isNegativeValAllowed?: boolean;
}

export default function NumberInput ( props: NumberInputProps ) {
    const { inputName, unit, isValueRelative, maxValue, isNegativeValAllowed } = props;
    const editValue = useGradientStore((state) => state.editGradientObjectValue);
    const inputValue = useGradientStore((state) => state[inputName]);
    return (
        <>
            <div className="input-decoration">
                <input 
                    className="number-input"
                    type="number"
                    max={maxValue ? maxValue : (isValueRelative ? 100 : undefined)}
                    min={isNegativeValAllowed ? undefined : 0}
                    onChange={(e) => editValue({ [inputName]: Number(e.currentTarget.value) })}
                    value={inputValue} 
                /> 
            </div>
            <span className="number-input-unit">{unit}</span>
        </>
    );
}