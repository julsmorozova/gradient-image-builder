import { useId } from 'react';
import { BackgroundInput, useGradientStore } from "./store";
import "./BackgroundBlockDropdown.css";

type DropdownItem = {
    id: number;
    name: string;
    value: string;
}

type BackgroundBlockDropdownProps = {
    backgroundId: BackgroundInput['id'];
    backgroundPropName: keyof Pick<BackgroundInput, 'repeat' | 'value'>;
    items: DropdownItem[];
}

export default function BackgroundBlockDropdown (props: BackgroundBlockDropdownProps) {
    const { items, backgroundId, backgroundPropName } = props;
    const editBackgroundValue = useGradientStore((state) => state.editBackgroundValue);
    const backgroundValue = useGradientStore((state) => state.backgroundInputs.find(i => i.id === backgroundId)?.[backgroundPropName]);
    const id = useId();
    
    return (
        <div className="background-dropdown">
            <div className="input-decoration">
            <select 
                id={id + '-background-dropdown'} 
                value={backgroundValue} 
                onChange={(e) => editBackgroundValue(backgroundId, backgroundPropName, e.currentTarget.value )}
            >
                {items.map(item => (
                    <option key={item.name} className="background-dropdown">{item.value}</option>
                ))}
            </select>
            </div>
        </div>
    );

}