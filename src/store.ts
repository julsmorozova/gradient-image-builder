import { create } from 'zustand';
// type LayerState = {}
// type GradientState = {}
type BackgroundInput = string;

export type GradientObjectState = {
    width: number;
    height: number;
    isBorderShown: boolean;
    borderWidth: number;
    backgroundInput: BackgroundInput;
}

type GradientObjectAction = {
    editGradientObjectValue: (state: Partial<GradientObjectState>) => void, // expected to be more gradient properties for ediitng
    editCheckboxValue: () => void,
}

export const useGradientStore = create<GradientObjectState & GradientObjectAction>((set) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    backgroundInput: 'linear-gradient(#000, #fff)',
    editGradientObjectValue: (incomingState) => set((state) => ({ ...state, ...incomingState })),
    editCheckboxValue: () => { set((state) => ({ ...state, isBorderShown: !state.isBorderShown }))},
}))
