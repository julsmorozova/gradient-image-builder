import { useGradientStore, BackgroundInput } from './store';
import "./NumberInput.css";

type GradientInputProps = {
    isStringInput?: boolean;
    unit?: 'rem' | 'px' | '%';
    isValueRelative?: boolean;
    maxValue?: number;
    backgroundPropName: keyof Pick<BackgroundInput, 'value' | 'x'| 'y'| 'h'| 'w'>;
    backgroundId: BackgroundInput['id'];
}

export default function GradientInput ( props: GradientInputProps ) {
    const { isStringInput, unit, isValueRelative, maxValue, backgroundPropName, backgroundId } = props;
    const editBackgroundValue = useGradientStore((state) => state.editBackgroundValue);
    const backgroundValue = useGradientStore((state) => state.backgroundInputs.find(i => i.id === backgroundId)?.[backgroundPropName]);

    const handleInputName = (name: string) => {
        return name === 'value' ? 'gradient' : name;
    };

    return (
        isStringInput ? 
            <textarea 
                data-gramm="false" 
                data-gramm_editor="false" 
                data-enable-grammarly="false" 
                onChange={(e) => editBackgroundValue(backgroundId, 'value', e.currentTarget.value)}
                value={backgroundValue} 
            /> :
            (
                <div className="code-input-input-wrapper-col">
                    <div className="label">{handleInputName(backgroundPropName)}</div>
                    <input 
                        type="number"
                        max={maxValue}
                        onChange={(e) => editBackgroundValue(backgroundId, backgroundPropName, e.currentTarget.value) }
                        value={backgroundValue} 
                    /> 
                    <span className="number-input-unit">{unit ? unit : isValueRelative ? '%' : ''}</span>
                </div>
            )
    );
}