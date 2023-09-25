import './CodeInput.css';
import { useGradientStore } from './store';

type CodeInputProps = {
    index: number;
}

export default function CodeInput(props: CodeInputProps) {
    const index = props.index;
    const backgroundValue = useGradientStore((state) => state.backgroundInputs[index].value);
    const editBackgroundValue = useGradientStore((state) => state.editBackgroundValue)
    return (
        <div className="container">
            <div className="label">background: </div>
            <textarea 
                data-gramm="false" 
                data-gramm_editor="false" 
                data-enable-grammarly="false" 
                onChange={(e) => editBackgroundValue({id: index, value : e.currentTarget.value})}
                value={backgroundValue} 
            />
        </div>
    );
}