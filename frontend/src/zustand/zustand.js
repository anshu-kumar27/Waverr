import {create} from 'zustand'

export const zustandStore = create((set)=>({
    authUser:null,

    isCheckingAuth:true
}))