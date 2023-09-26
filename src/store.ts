import { create } from 'zustand';
export type BackgroundInput = { 
    id: string;
    value: string;
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
    editBackgroundValue: (incomingState: BackgroundInput) => void,
    addBackgroundLayer: () => void,
    deleteBackgroundLayer: (id: BackgroundInput['id']) => void,
    editCheckboxValue: () => void,
}

const gradientDefaultValue = "linear-gradient(#76ecd4, #fff)";
const gradientDefaultValue1 = "radial-gradient(20% 20% at 35% 50.5%, #000 49.5%, transparent 50%)";

export const useGradientStore = create<GradientObjectState & GradientObjectAction>((set) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    backgroundInputs: [{id: new Date().valueOf().toString(), value: gradientDefaultValue1}],
    updateBackgroundInputs: (incomingState) => set((state) => ({ ...state, backgroundInputs: [...incomingState] })),
    editGradientObjectValue: (incomingState) => set((state) => ({ ...state, ...incomingState })),
    editBackgroundValue: (incomingState) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.map(i => {
        if (i.id === incomingState.id) {
            return { ...i, value: incomingState.value }
        }
        else {
            return i
        }
    })})),
    addBackgroundLayer: () => set((state) => ({ ...state, backgroundInputs: [ ...state.backgroundInputs, { id: new Date().valueOf().toString(), value: gradientDefaultValue }]})),
    deleteBackgroundLayer: (id) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.filter(item => item.id !== id)})),
    editCheckboxValue: () => { set((state) => ({ ...state, isBorderShown: !state.isBorderShown }))},
}))
