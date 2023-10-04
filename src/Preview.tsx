import { Fragment } from 'react';
import { useGradientStore } from './store';
import './Preview.css';
import { styleObjectToString, concatBackgroundValues } from './tools';
import OutcomeCodeBlock from './OutcomeCodeBlock';

export default function Preview() {
    const backgroundInputs = useGradientStore((state) => state.backgroundInputs);
    const backgroundEditedValue = concatBackgroundValues(backgroundInputs);
    const width = useGradientStore((state) => state.width);
    const height = useGradientStore((state) => state.height);
    const isBorderShown = useGradientStore((state) => state.isBorderShown);
    const borderWidth = useGradientStore((state) => state.borderWidth);

    const styleBlock = {
        width: width + 'rem',
        height: height + 'rem',
        border: isBorderShown ? borderWidth + 'px solid #b1b1b1' : 'none',
        background: backgroundEditedValue,
        // backgroundRepeat: 'no-repeat',
    };

    const outcomeString = styleObjectToString(styleBlock);
    console.log(outcomeString);

    return (
        <>
            <div className='preview-container'>
                <Fragment>
                    <div style={styleBlock}></div>
                </Fragment>
            </div>
            <OutcomeCodeBlock outcome={outcomeString} />
        </>
    );
}