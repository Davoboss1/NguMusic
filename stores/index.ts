import { create, StateCreator } from "zustand";
import { userSliceType, userTokensSliceType } from "./types";
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userSlice: StateCreator<
    userSliceType,
    [],
    [],
    userSliceType
> = (set) => ({
    user: null,
    setUser: (user) => set(() => ({ user: user })),
})

export const userTokensSlice: StateCreator<
    userTokensSliceType,
    [],
    [],
    userTokensSliceType
> = (set) => ({
    access: "",
    refresh: "",
    setAccessToken: (val) => set(() => ({ access: val })),
    setRefreshToken: (val) => set(() => ({ refresh: val })),
})

/*
const useStore = create<userSliceType>()((...a) => ({

}))
*/

export const usePersistedStore = create<userSliceType & userTokensSliceType>()(
    persist(
        (...a) => ({
            ...userSlice(...a),
            ...userTokensSlice(...a)
        }),
        {
            name: 'ngu-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
