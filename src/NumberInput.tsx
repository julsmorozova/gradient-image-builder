import { useGradientStore, GradientObjectState } from './store';

type NumberInputProps = {
    inputName: keyof Pick<GradientObjectState, 'height' | 'width' | 'borderWidth'>;
    unit: 'rem' | 'px';
}

export default function NumberInput ( props: NumberInputProps ) {
    const { inputName, unit } = props;
    const editValue = useGradientStore((state) => state.editGradientObjectValue);
    const inputValue = useGradientStore((state) => state[inputName]);
    return (
        <div className="container">
            <div className="label">{inputName}: </div>
            <input 
                data-gramm="false" 
                data-gramm_editor="false" 
                data-enable-grammarly="false" 
                onChange={(e) => editValue({ [inputName]: Number(e.currentTarget.value) })}
                value={inputValue} 
            /> {unit}
        </div>
    );
}