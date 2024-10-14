import { CSSProperties, MutableRefObject } from "react";
import { BackgroundInput } from "./store";

export enum GradientType {
  RADIAL = "radial",
  LINEAR = "linear",
}

export const styleObjectToString = (styleObject: CSSProperties) => {
  return (
    Object.entries(styleObject)
      .map(
        ([k, v]) =>
          k.toString().replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`) +
          `: ${v}`
      )
      .join(";\n") + ";"
  );
};

export const concatBackgroundValues = (backgroundsArray: BackgroundInput[]) => {
  return backgroundsArray
    .map((item) =>
      (typeof item.value === "string" && item.value?.endsWith(")")) ||
      (typeof item.value === "string" && item.value?.endsWith(") "))
        ? item.value +
          ((item.x ? " " + item.x + "%" : " 0%") +
            (item.y ? " " + item.y + "%" : " 0%") +
            "/" +
            (item.w ? " " + item.w + "%" : " auto") +
            (item.h ? " " + item.h + "%" : " auto") +
            (item.repeat ? " " + item.repeat : " no-repeat"))
        : item.value
    )
    .toString();
};

export const editDisplayStylePropName = (name: string) => {
  return name.replace(/[A-Z]/g, (match) => ` ${match.toLowerCase()}`);
};

export const parseGradientString = (
  string: BackgroundInput["value"]
): Partial<BackgroundInput> | null => {
  const strForParsing =
    string &&
    typeof string === "string" &&
    string.substring(string.indexOf(")") + 1);
  if (strForParsing && strForParsing !== " ") {
    const x = parseInt(
      strForParsing
        .substring(0, strForParsing.indexOf("/"))
        .split(" ")
        .filter((i) => i !== "")[0]
    );
    const y = parseInt(
      strForParsing
        .substring(0, strForParsing.indexOf("/"))
        .split(" ")
        .filter((i) => i !== "")[1]
    );
    const w = parseInt(
      strForParsing
        .substring(strForParsing.indexOf("/") + 1)
        .split(" ")
        .filter((i) => i !== "")[0]
    );
    const h = parseInt(
      strForParsing
        .substring(strForParsing.indexOf("/") + 1)
        .split(" ")
        .filter((i) => i !== "")[1]
    );
    const repeat = strForParsing
      .substring(strForParsing.indexOf("/") + 1)
      .split(" ")
      .filter((i) => i !== "")[2];
    return {
      x: x as number,
      y: y as number,
      w: w as number,
      h: h as number,
      repeat: repeat,
    };
  } else {
    return null;
  }
};

export const handleClone = (
  items: BackgroundInput[],
  id: BackgroundInput["id"]
) => {
  const curIndex: number = items.findIndex((i: BackgroundInput) => i.id === id);
  const copiedItem: BackgroundInput = items[curIndex] && {
    ...items[curIndex],
    id: new Date().valueOf().toString(),
    isDefaultData: false,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return items.toSpliced(curIndex, 0, copiedItem);
};

export const getColorsFromInput = (input: string): string[] => {
  const re =
    /(^[a-zA-Z]+$)|transparent|(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s/]*[\d.]+%?\))/gi;
  return [...input.matchAll(re)].map((i) => i[0]);
};

export const getGradientType = (input: string): GradientType => {
  return input.startsWith("radial-")
    ? GradientType.RADIAL
    : GradientType.LINEAR;
};

/* Drag and drop */
export const dragStart = (id: string, ref: MutableRefObject<string | null>) => {
  ref.current = id;
};

export function getDragDirection(e: React.DragEvent) {
  const currentTarget = e.currentTarget as HTMLDivElement;
  const y0 = currentTarget && currentTarget?.getBoundingClientRect().y;
  const y1 = e.clientY;
  const targetHeight = currentTarget && currentTarget?.clientHeight;
  const dragDiff = y1 - y0;
  if (dragDiff < 0 || dragDiff > targetHeight) return;
  if (dragDiff <= targetHeight / 3) {
    return "before";
  } else if (dragDiff >= 0.67 * targetHeight) {
    return "after";
  } else {
    return "inside";
  }
}

export const handleDragEnter = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  const direction = getDragDirection(e);
  const currentTarget = e.currentTarget as HTMLDivElement;

  if (direction === "before") {
    currentTarget.classList.add("inserting-above");
  }
  if (direction === "after") {
    currentTarget.classList.add("inserting-below");
  }
  if (direction === "inside" && currentTarget.classList.contains("group")) {
    currentTarget.classList.add("inserting-inside");
  }
};

export const handleDragLeave = (e: React.DragEvent) => {
  e.preventDefault();
  const direction = getDragDirection(e);
  const currentTarget = e.currentTarget as HTMLDivElement;
  const target = e.target as HTMLDivElement;
  if (
    (direction !== "before" &&
      currentTarget.classList.contains("inserting-above")) ||
    (currentTarget.classList.contains("group") &&
      !target.classList.contains("group"))
  ) {
    currentTarget.classList.remove("inserting-above");
  }
  if (
    (direction !== "after" &&
      currentTarget.classList.contains("inserting-below")) ||
    (currentTarget.classList.contains("group") &&
      !target.classList.contains("group"))
  ) {
    currentTarget.classList.remove("inserting-below");
  }
  if (
    direction !== "inside" &&
    currentTarget.classList.contains("inserting-inside")
  ) {
    currentTarget.classList.remove("inserting-inside");
  }
};

export const removeDirectionClasses = (e: React.DragEvent) => {
  const currentTarget = e.currentTarget as HTMLDivElement;
  currentTarget.classList.remove(
    "inserting-above",
    "inserting-below",
    "inserting-inside"
  );
};
