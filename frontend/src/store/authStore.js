
import { create } from "zustand"
import axios from "axios"

const baseURL = 'http://localhost:3000/api/auth'

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({isLoading: true, error:null})
        try{
            const response = await axios.post(`${baseURL}/signup`, {email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false })
        }catch(error){
            set({error: error.response.data.message || "Error signing up", isLoading: false})
            throw error
        }
    },

    verifyEmail: async (verificationToken) => {
        set({isLoading: true, error: null })
        try{
            const response = await axios.post(`${baseURL}/verify-email`, { verificationToken } )
            set({user: response.data.user, isAuthenticated: true, isLoading: false})
        }catch(error){
            set({error: error.response?.data?.message || "error verifying email", isLoading: false})
            throw error
        }
    },

    checkAuth: async () => {
        set({isCheckingAuth: true, error: null})
        try{
            const response = await axios.get(`${baseURL}/check-auth`)
            console.log(response?.data)
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false})
        }catch(error){
            set({error: null, isCheckingAuth: false, isAuthenticated: false})
        }
    }
}))
