import { useGradientStore } from './store';
import CodeInput from "./CodeInput";

export default function BuilderPanel() {
    const width = useGradientStore((state) => state.width);
    const height = useGradientStore((state) => state.height);
    const isBorderShown = useGradientStore((state) => state.isBorderShown);
    const borderWidth = useGradientStore((state) => state.borderWidth);
    const editValue = useGradientStore((state) => state.editGradientObjectValue);
    const editCheckboxValue = useGradientStore((state) => state.editCheckboxValue);

    return (
        <div className="panel-container">
            <div className="container">
                <div className="label">width: </div>
                <input 
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={(e) => editValue({ width: Number(e.currentTarget.value) })}
                    value={width} 
                /> rem
            </div>
            <div className="container">
                <div className="label">height: </div>
                <input 
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={(e) => editValue({ height: Number(e.currentTarget.value)})}
                    value={height} 
                /> rem
            </div>
            <div className="container">
                <div className="label">border visible: </div>
                <input 
                    type="checkbox"
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={editCheckboxValue}
                    checked={!!isBorderShown} 
                />
            </div>
            <div className="container">
                <div className="label">border width: </div>
                <input 
                    disabled={!isBorderShown}
                    data-gramm="false" 
                    data-gramm_editor="false" 
                    data-enable-grammarly="false" 
                    onChange={(e) => editValue({ borderWidth: Number(e.currentTarget.value)})}
                    value={borderWidth} 
                />  px
            </div>
            <CodeInput />
        </div>
    );
}