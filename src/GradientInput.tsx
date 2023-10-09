import { useGradientStore, BackgroundInput } from './store';
import "./NumberInput.css";

type GradientInputProps = {
    isStringInput?: boolean;
    unit?: 'rem' | 'px' | '%';
    isValueRelative?: boolean;
    maxValue?: number;
    backgroundPropName: keyof Pick<BackgroundInput, 'value' | 'name' | 'x'| 'y'| 'h'| 'w'>;
    backgroundId: BackgroundInput['id'];
    isNegativeValAllowed?: boolean;
    isTextarea?: boolean;
}

export default function GradientInput ( props: GradientInputProps ) {
    const { isStringInput, unit, isValueRelative, maxValue, backgroundPropName, backgroundId, isNegativeValAllowed, isTextarea } = props;
    const editBackgroundValue = useGradientStore((state) => state.editBackgroundValue);
    const backgroundValue = useGradientStore((state) => state.backgroundInputs.find(i => i.id === backgroundId)?.[backgroundPropName]);

    const handleInputName = (name: string) => {
        return name === 'value' ? 'gradient' : name;
    };

    return (
        isStringInput ? 
            <div className="input-decoration">
                {isTextarea ? 
                    <textarea 
                        data-gramm="false" 
                        data-gramm_editor="false" 
                        data-enable-grammarly="false" 
                        onChange={(e) => editBackgroundValue(backgroundId, 'value', e.currentTarget.value)}
                        value={backgroundValue} 
                        spellCheck="false"
                    /> :
                    <input 
                        type="text"
                        spellCheck="false"
                        onChange={(e) => editBackgroundValue(backgroundId, 'name', e.currentTarget.value) }
                        value={backgroundValue}
                    />
                }
            </div> :
            (
                <div className="bg-block-input-wrapper-col">
                    <div className="label">{handleInputName(backgroundPropName)}</div>
                    <div className="input-decoration">
                        <input 
                            type="number"
                            max={maxValue}
                            onChange={(e) => editBackgroundValue(backgroundId, backgroundPropName, e.currentTarget.value) }
                            value={backgroundValue}
                            min={isNegativeValAllowed ? undefined : 0} 
                        />
                    </div> 
                    <span className="number-input-unit">{unit ? unit : isValueRelative ? '%' : ''}</span>
                </div>
            )
    );
}