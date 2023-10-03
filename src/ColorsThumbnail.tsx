import { getColorsFromInput } from "./tools";
import { BackgroundInput, useGradientStore } from "./store";
import { Tooltip } from "react-tooltip";

type ColorsThumbnailProps = {
    id: BackgroundInput['id'];
}

export default function ColorsThumbnail (props: ColorsThumbnailProps) {
    const { id } = props;
    const value = useGradientStore((state) => state.backgroundInputs.find(i => i.id === id)?.value);
    const parsedColors = value && getColorsFromInput(value);
    const gradientValue = parsedColors?.toString() && `linear-gradient(${parsedColors?.toString()})`;

    const styleBlock = {
        width: '3rem',
        height: '1.5rem',
        boxShadow: '0 0 0.25rem #d2d2d2',
        borderRadius: '0.25rem',
        background: gradientValue,
    };

    return (
        <>
            <div style={styleBlock} data-tooltip-id={`colors-thumbnail-${id}`} data-tooltip-content="Colors used" />
            <Tooltip id={`colors-thumbnail-${id}`} />
        </>
    );
}