import { CSSProperties } from 'react';
import { BackgroundInput } from './store';

export const styleObjectToString = (styleObject: CSSProperties) => {
    return Object.entries(styleObject).map(([k, v]) => k.toString().replace(/[A-Z]/g, match => `-${match.toLowerCase()}`) + `: ${v}`).join(';\n') + ';';
};

export const concatBackgroundValues = (backgroundsArray: BackgroundInput[]) => {
    return backgroundsArray.map(item => item.value + 
        ((item.x ? ' ' + item.x + '%' : ' 0%') + 
        (item.y ? ' ' + item.y + '%' : ' 0%') +
        '/' + (item.w ? ' ' + item.w + '%' : ' auto') + 
        (item.h ? ' ' + item.h + '%' : ' auto') + 
        (item.repeat ? ' ' + item.repeat : ' no-repeat'))
        ).toString();
};

export const editDisplayStylePropName = (name: string) => {
    return name.replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`);
}