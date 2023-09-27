import GradientInput from './GradientInput';
import './GradientInput.css';
import { useGradientStore } from './store';

type GradientBlockProps = {
    id: string;
}

export default function GradientBlock(props: GradientBlockProps) {
    const id = props.id;
    const backgroundLayersLength = useGradientStore((state) => state.backgroundInputs.length);
    // const layerIndex = useGradientStore((state) => state.backgroundInputs.findIndex((i => i.id === id)));
    const deleteBackgroundLayer = useGradientStore((state) => state.deleteBackgroundLayer);
    return (
        <div className="code-input-container">
            <div className="bg-value-container row">
                <div className="code-input-label">gradient: </div>
                <div className="code-input-input-wrapper">
                    <GradientInput
                        key={`${id}-value`}
                        isStringInput
                        backgroundId={id}
                        backgroundPropName='value'
                        isValueRelative
                    />
                    <button 
                        disabled={backgroundLayersLength === 1}
                        className="btn btn-secondary delete-bg-layer-btn" 
                        onClick={() => deleteBackgroundLayer(id)}
                    >
                        x
                    </button>
                </div>
            </div>
            <div className="bg-position-container row row-secondary">
                <div className="code-input-label label">{'position: '}</div>
                <div className="code-input-input-wrapper">
                    <GradientInput
                        key={`${id}-x`}
                        backgroundId={id}
                        backgroundPropName='x'
                        isValueRelative
                    />
                    <GradientInput
                        key={`${id}-y`}
                        backgroundId={id}
                        backgroundPropName='y'
                        isValueRelative
                    />
                </div>
            </div>
            <div className="bg-size-container row row-secondary">
                <div className="code-input-label label">{'size: '}</div>
                <div className="code-input-input-wrapper">
                    <GradientInput
                        key={`${id}-w`}
                        backgroundId={id}
                        backgroundPropName='w'
                        isValueRelative
                    />
                    <GradientInput
                        key={`${id}-h`}
                        backgroundId={id}
                        backgroundPropName='h'
                        isValueRelative
                    />
                </div>
            </div>
        </div>
    );
}