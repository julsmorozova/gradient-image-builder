import './CodeInput.css';
import { useGradientStore } from './store';

type CodeInputProps = {
    id: string;
}

export default function CodeInput(props: CodeInputProps) {
    const id = props.id;
    const backgroundLayersLength = useGradientStore((state) => state.backgroundInputs.length);
    const backgroundValue = useGradientStore((state) => state.backgroundInputs.find(i => i.id === id)?.value);
    const editBackgroundValue = useGradientStore((state) => state.editBackgroundValue);
    const deleteBackgroundLayer = useGradientStore((state) => state.deleteBackgroundLayer);
    return (
        <div className="container">
            <div className="label">background: </div>
            <textarea 
                data-gramm="false" 
                data-gramm_editor="false" 
                data-enable-grammarly="false" 
                onChange={(e) => editBackgroundValue({id, value : e.currentTarget.value})}
                value={backgroundValue} 
            />
            <button 
                disabled={backgroundLayersLength === 1}
                id="delete-bg-layer-btn" 
                onClick={() => deleteBackgroundLayer(id)}
            >
                x
            </button>
        </div>
    );
}