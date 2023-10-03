import GradientInput from './GradientInput';
import './BackgroundBlock.css';
import { useGradientStore } from './store';
import BackgroundBlockDropdown from './BackgroundBlockDropdown';
import Accordion from './Accordion';
import { Tooltip } from 'react-tooltip';
import classnames from 'classnames';
import ColorsThumbnail from './ColorsThumbnail';

type BackgroundBlockProps = {
    id: string;
}

const repeatOptions = [
    {
        id: 0,
        name: 'noRepeat',
        value: 'no-repeat',
    },
    {
        id: 1,
        name: 'repeatX',
        value: 'repeat-x',
    },
    {
        id: 2,
        name: 'repeatY',
        value: 'repeat-y',
    },
];

export default function BackgroundBlock(props: BackgroundBlockProps) {
    const id = props.id;
    const backgroundLayersLength = useGradientStore((state) => state.backgroundInputs.length);
    const deleteBackgroundLayer = useGradientStore((state) => state.deleteBackgroundLayer);
    const cloneLayer = useGradientStore((state) => state.cloneLayer);
    const isDefaultData = useGradientStore((state) => state.backgroundInputs.find(i => i.id === id)?.isDefaultData);

    return (
        <div className="code-input-container">
            <Accordion 
                backgroundId={id}
                headerContent={(
                    <>
                    <div className="bg-value-container row">
                        <div className="code-input-label">
                        <ColorsThumbnail id={id}/>
                        </div>
                    </div>
                    <div className="bg-value-container row">
                        <div className="code-input-label">
                            <div>gradient: </div>
                            <div className={classnames("default-data-flag", {show: isDefaultData})}>default data</div>
                        </div>
                        <div className="code-input-input-wrapper">
                            <GradientInput
                                key={`${id}-value`}
                                isStringInput
                                backgroundId={id}
                                backgroundPropName='value'
                                isValueRelative
                            />
                            <div className="code-input-wrapper btn-wrapper">
                                <button 
                                    disabled={backgroundLayersLength === 1}
                                    className="btn btn-secondary delete-bg-layer-btn" 
                                    onClick={() => deleteBackgroundLayer(id)}
                                    data-tooltip-id="delete-layer" 
                                    data-tooltip-content="Remove layer"
                                >
                                    x
                                </button>
                                {backgroundLayersLength > 1 && <Tooltip id="delete-layer" />}
                                <button 
                                    className="btn btn-secondary duplicate-bg-layer-btn" 
                                    onClick={() => cloneLayer(id)}
                                    data-tooltip-id="clone-layer" 
                                    data-tooltip-content="Clone layer"
                                    data-tooltip-place="right"
                                >
                                    <div className="copy-icon" />
                                </button>
                                <Tooltip id="clone-layer" />
                            </div>
                        </div>
                    </div>
                    </>
                    
                )}
            >
                <>
                     <div className="bg-position-container row row-secondary">
                        <div className="code-input-label label">{'position: '}</div>
                        <GradientInput
                            key={`${id}-x`}
                            backgroundId={id}
                            backgroundPropName='x'
                            isValueRelative
                            isNegativeValAllowed
                        />
                        <GradientInput
                            key={`${id}-y`}
                            backgroundId={id}
                            backgroundPropName='y'
                            isValueRelative
                            isNegativeValAllowed
                        />
                    </div>
                    <div className="bg-size-container row row-secondary">
                        <div className="code-input-label label">{'size: '}</div>
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
                    <div className="bg-size-container row row-secondary">
                        <div className="code-input-label label">repeat: </div>
                        <BackgroundBlockDropdown items={repeatOptions} backgroundId={id} backgroundPropName='repeat' />
                    </div>
                </>
            </Accordion>
        </div>
    );
}