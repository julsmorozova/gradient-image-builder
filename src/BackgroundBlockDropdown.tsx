import { useId } from "react";
import { BackgroundInput, GradientObjectAction } from "./store";
import "./BackgroundBlockDropdown.css";

type DropdownItem = {
  id: number;
  name: string;
  value: string;
};

type BackgroundBlockDropdownProps = {
  backgroundId: BackgroundInput["id"];
  items: DropdownItem[];
  action: GradientObjectAction["editBackgroundValue"];
  backgroundPropName: keyof Pick<BackgroundInput, "repeat" | "value">;
  value?: string;
};

export default function BackgroundBlockDropdown({
  items,
  backgroundId,
  backgroundPropName,
  action,
  value,
}: BackgroundBlockDropdownProps) {
  const id = useId();

  return (
    <div className="background-dropdown">
      <div className="input-decoration">
        <select
          id={id + "-background-dropdown"}
          value={value}
          onChange={(e) =>
            action(backgroundId, backgroundPropName, e.currentTarget.value)
          }
        >
          {items.map((item) => (
            <option key={item.name} className="background-dropdown">
              {item.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
