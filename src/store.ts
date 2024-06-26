import { create } from 'zustand';
import { handleClone } from './tools';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BackgroundInputNumber = undefined | number;

export type BackgroundInput = { 
    id: string;
    name?: string;
    isDefaultData: boolean;
    isHidden?: boolean;
    value?: string;
    x?: number;
    y?: BackgroundInputNumber;
    w?: BackgroundInputNumber;
    h?: BackgroundInputNumber;
    repeat?: string;
}

export type GradientObjectState = {
    width: number;
    height: number;
    isBorderShown: boolean;
    borderWidth: number;
    counter: number;
    backgroundInputs: BackgroundInput[];
}

type GradientObjectAction = {
    updateBackgroundInputs: (incomingState: BackgroundInput[]) => void,
    cloneLayer: (id: BackgroundInput['id']) => void,
    editGradientObjectValue: (incomingState: Partial<GradientObjectState>) => void,
    addBackgroundLayer: () => void,
    deleteBackgroundLayer: (id: BackgroundInput['id']) => void,
    editBackgroundValue: (id: BackgroundInput['id'], valueName: keyof BackgroundInput, value: BackgroundInput['value'] | BackgroundInputNumber ) => void,
    editCheckboxValue: () => void,
    toggleLayerVisibility: (id: BackgroundInput['id']) => void,
}

const gradientDefaultValue = "linear-gradient(transparent 0 30%, pink 30% 34%, transparent 34% 49%, #76ecd4 49% 53%, transparent 53%)";
const gradientDefaultValue1 = "radial-gradient(100% 100% at 50% 50%, #000 49.5%, transparent 50%)";

export const useGradientStore = create<GradientObjectState & GradientObjectAction>()(persist((set, get) => ({
    width: 20,
    height: 20,
    isBorderShown: true,
    borderWidth: 1,
    counter: 1,
    backgroundInputs: [{
        id: new Date().valueOf().toString(),
        name: 'layer-1', 
        isDefaultData: true, 
        isHidden: false, 
        value: gradientDefaultValue1, 
        x: 30, 
        y: 30, 
        w: 20, 
        h: 20, 
        repeat: 'no-repeat',
    }],
    cloneLayer: (id) => set({ ...get(), counter: get().counter + 1, backgroundInputs: [...handleClone(get().backgroundInputs, id)]}),
    updateBackgroundInputs: (incomingState) => set ({ ...get(), backgroundInputs: [...incomingState] }),
    editGradientObjectValue: (incomingState) => set({ ...get(), ...incomingState }),
    addBackgroundLayer: () => set({ 
        ...get(),
        counter: get().counter + 1, 
        backgroundInputs: [ 
            { 
                id: new Date().valueOf().toString(),
                name: `layer-${get().counter + 1}`,  
                isDefaultData: true, 
                isHidden: false,
                value: gradientDefaultValue, 
                x: 0, 
                y: 0, 
                w: 100, 
                h: 100, 
                repeat: 'no-repeat'
            },
            ...get().backgroundInputs, 
        ]
    }),
    deleteBackgroundLayer: (id) => set({ ...get(), backgroundInputs: get().backgroundInputs.filter(item => item.id !== id)}),
    editBackgroundValue: (id, valueName, value) => set({...get(), backgroundInputs: get().backgroundInputs.map(i => {
        if (i.id === id) {
            return { ...i, isDefaultData: false, [valueName]: value};
        } else {
            return i;
        }
    })}),
    editCheckboxValue: () => set({ ...get(), isBorderShown: !get().isBorderShown }),
    toggleLayerVisibility: (id) => set({ ...get(), backgroundInputs: get().backgroundInputs.map(i => {
        if (i.id === id) {
            return { ...i, isHidden: !i.isHidden};
        } else {
            return i;
        }
    })}),
}),
{
    name: `gradient-image`,
    storage: createJSONStorage(() => localStorage),
}))
