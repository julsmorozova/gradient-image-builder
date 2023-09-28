import { create } from 'zustand';

export type BackgroundInputNumber = undefined | number;
export type BackgroundInput = { 
    id: string;
    isAccordionOpen: boolean;
    value: string;
    x: number;
    y: BackgroundInputNumber;
    w: BackgroundInputNumber;
    h: BackgroundInputNumber;
    repeat?: string;
    // repeat?: 'repeat-x' | 'repeat-y' | 'no-repeat';
}

export type GradientObjectState = {
    width: number;
    height: number;
    isBorderShown: boolean;
    borderWidth: number;
    backgroundInputs: BackgroundInput[];
}

type GradientObjectAction = {
    updateBackgroundInputs: (incomingState: BackgroundInput[]) => void,
    editGradientObjectValue: (incomingState: Partial<GradientObjectState>) => void,
    addBackgroundLayer: () => void,
    deleteBackgroundLayer: (id: BackgroundInput['id']) => void,
    editBackgroundValue: (id: BackgroundInput['id'], valueName: keyof BackgroundInput, value: BackgroundInput['value'] | BackgroundInputNumber | BackgroundInput['isAccordionOpen']) => void,
    editCheckboxValue: () => void,
}

const gradientDefaultValue = "linear-gradient(#fff 0 30%, #76ecd4 30% 34%, #fff 34% 49%, #76ecd4 49% 53%, #fff 53%)";
const gradientDefaultValue1 = "radial-gradient(100% 100% at 50% 50%, #000 49.5%, transparent 50%)";

export const useGradientStore = create<GradientObjectState & GradientObjectAction>((set) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    backgroundInputs: [{id: new Date().valueOf().toString(), isAccordionOpen: true, value: gradientDefaultValue1, x: 30, y: 30, w: 20, h: 20, repeat: 'no-repeat'}],
    updateBackgroundInputs: (incomingState) => set((state) => ({ ...state, backgroundInputs: [...incomingState] })),
    editGradientObjectValue: (incomingState) => set((state) => ({ ...state, ...incomingState })),
    addBackgroundLayer: () => set((state) => ({ ...state, backgroundInputs: [ ...state.backgroundInputs, { id: new Date().valueOf().toString(), isAccordionOpen: true, value: gradientDefaultValue, x: 0, y: 0, w: 100, h: 100, repeat: 'no-repeat' }]})),
    deleteBackgroundLayer: (id) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.filter(item => item.id !== id)})),
    editBackgroundValue: (id, valueName, value) => set((state) => ({...state, backgroundInputs: state.backgroundInputs.map(i => {
        if (i.id === id) {
            return { ...i, [valueName]: value};
        } else {
            return i;
        }
    })})),
    editCheckboxValue: () => { set((state) => ({ ...state, isBorderShown: !state.isBorderShown }))},
}))
