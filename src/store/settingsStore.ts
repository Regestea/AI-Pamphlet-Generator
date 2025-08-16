import {create} from "zustand";

type SettingsStoreType = {
    ShowSettings: boolean,
    SetShowSettings: (value: boolean) => void,
}

export const useSettingsStore=create<SettingsStoreType>(set=>({
    ShowSettings: false,
    SetShowSettings: (value: boolean) => set({ShowSettings: value}),
}))