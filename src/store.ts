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
    editGradientObjectValue: (incomingState: Partial<GradientObjectState>) => void,
    editBackgroundValue: (incomingState: BackgroundInput) => void,
    addBackgroundLayer: () => void,
    deleteBackgroundLayer: (id: BackgroundInput['id']) => void,
    editCheckboxValue: () => void,
}

const gradientDefaultValue = "linear-gradient(#000, #fff)";

export const useGradientStore = create<GradientObjectState & GradientObjectAction>((set) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    backgroundInputs: [{id: new Date().valueOf().toString(), value: gradientDefaultValue}],
    editGradientObjectValue: (incomingState) => set((state) => ({ ...state, ...incomingState })),
    editBackgroundValue: (incomingState) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.map(i => {
        console.log('edit action id', i.id);
        if (i.id === incomingState.id) {
            return { ...incomingState, value: incomingState.value }
        }
        else {
            return i
        }
    })})),
    addBackgroundLayer: () => set((state) => ({ ...state, backgroundInputs: [ ...state.backgroundInputs, { id: new Date().valueOf().toString(), value: gradientDefaultValue }]})),
    deleteBackgroundLayer: (id) => set((state) => ({ ...state, backgroundInputs: state.backgroundInputs.filter(item => item.id !== id)})),
    editCheckboxValue: () => { set((state) => ({ ...state, isBorderShown: !state.isBorderShown }))},
}))
