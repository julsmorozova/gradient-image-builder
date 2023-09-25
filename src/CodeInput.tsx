import './CodeInput.css';
import { useGradientStore } from './store';

export default function CodeInput() {
    const backgroundValue = useGradientStore((state) => state.backgroundInput);
    const editBackgroundValue = useGradientStore((state) => state.editGradientObjectValue)
    return (
        <div className="container">
            <div className="label">background: </div>
            <textarea 
                data-gramm="false" 
                data-gramm_editor="false" 
                data-enable-grammarly="false" 
                onChange={(e) => editBackgroundValue({backgroundInput: e.currentTarget.value})}
                value={backgroundValue} 
            />
        </div>
    );
}