import { CSSProperties } from 'react';

export const styleObjectToString = (styleObject: CSSProperties) => {
    return Object.entries(styleObject).map(([k, v]) => k.toString().replace(/[A-Z]/g, match => `-${match.toLowerCase()}`) + `: ${v}`).join(';\n') + ';';
};