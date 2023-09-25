import { create } from 'zustand';
export type BackgroundInput = { 
    id: number;
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
    editGradientObjectValue: (incomingState: Partial<GradientObjectState>) => void, // expected to be more gradient properties for ediitng
    editBackgroundValue: (incomingState: BackgroundInput) => void,
    addBackgroundLayer: () => void,
    editCheckboxValue: () => void,
}

const gradientDefaultValue = "linear-gradient(#000, #fff)";

export const useGradientStore = create<GradientObjectState & GradientObjectAction>((set) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    backgroundInputs: [{id: 0, value: gradientDefaultValue}],
    editGradientObjectValue: (incomingState) => set((state) => ({ ...state, ...incomingState })),
    editBackgroundValue: (incomingState) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.map(i => {
        if (i.id === incomingState.id) {
            return { ...incomingState, value: incomingState.value }
        }
        else {
            return i
        }
    })})),
    addBackgroundLayer: () => set((state) => ({ ...state, backgroundInputs: [ ...state.backgroundInputs, { id: state.backgroundInputs.length, value: gradientDefaultValue }]})),
    editCheckboxValue: () => { set((state) => ({ ...state, isBorderShown: !state.isBorderShown }))},
}))
