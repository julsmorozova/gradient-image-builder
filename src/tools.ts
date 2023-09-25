import { CSSProperties } from 'react';
import { BackgroundInput } from './store';

export const styleObjectToString = (styleObject: CSSProperties) => {
    return Object.entries(styleObject).map(([k, v]) => k.toString().replace(/[A-Z]/g, match => `-${match.toLowerCase()}`) + `: ${v}`).join(';\n') + ';';
};

export const concatBackgroundValues = (backgroundsArray: BackgroundInput[]) => {
    return backgroundsArray.map(item => item.value).toString();
};