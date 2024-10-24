import { Fragment } from "react";
import { isString, useGradientStore } from "./store";
import "./Preview.css";
import { styleObjectToString, concatBackgroundValues } from "./tools";
import OutcomeCodeBlock from "./OutcomeCodeBlock";

export default function Preview() {
  const layerRegistryElements = useGradientStore((state) =>
    Object.values(state.layerRegistry).filter((i) => !i.isHidden)
  );

  const layoutElements = useGradientStore((state) => state.layout).flatMap(
    (i) => {
      if (!isString(i)) {
        return [...i.children];
      }
      return i;
    }
  );

  const backgroundInputs = layoutElements.flatMap((i) => {
    for (const elem of layerRegistryElements) {
      if (elem.id === i) {
        return elem;
      }
    }
    return [];
  });

  const backgroundEditedValue = concatBackgroundValues(backgroundInputs);
  const width = useGradientStore((state) => state.width);
  const height = useGradientStore((state) => state.height);
  const isBorderShown = useGradientStore((state) => state.isBorderShown);
  const borderWidth = useGradientStore((state) => state.borderWidth);

  const styleBlock = {
    margin: "auto 0",
    width: width + "rem",
    height: height + "rem",
    border: isBorderShown ? borderWidth + "px solid #b1b1b1" : "none",
    background: backgroundEditedValue,
  };

  const outcomeString = styleObjectToString(styleBlock);

  return (
    <>
      <div className="preview-container">
        <Fragment>
          <div style={styleBlock}></div>
        </Fragment>
      </div>
      <OutcomeCodeBlock outcome={outcomeString} />
    </>
  );
}
