
import { create } from "zustand"
import axios from "axios"


const baseURL = 'https://modus-task-manager.onrender.com/api/auth'

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    clearError: () => set({ error: null }),

    signup: async (email, password, name) => {
        set({isLoading: true, error:null})
        try{
            const response = await axios.post(`${baseURL}/signup`, {email, password, name})
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null })
        }catch(error){
            set({error: error.response.data.message || "Error signing up", isLoading: false})
            throw error
        }
    },

    verifyEmail: async (verificationToken) => {
        set({isLoading: true, error: null })
        try{
            const response = await axios.post(`${baseURL}/verify-email`, { verificationToken } )
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null})
        }catch(error){
            set({error: error.response?.data?.message || "error verifying email", isLoading: false})
            throw error
        }
    },

    checkAuth: async () => {
        set({isCheckingAuth: true, error: null})
        try{
            const response = await axios.get(`${baseURL}/check-auth`)
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false, error: null})
        }catch(error){
            set({error: null, isCheckingAuth: false, isAuthenticated: false})
        }
    },

    login: async (email, password) => {
        set({isLoading: true, error: null})
        try{
            const response = await axios.post(`${baseURL}/login`, {email, password})
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null})
        }catch(error){
            set({error: error.response?.data?.message || "Error logging in user", isLoading: false})
            throw error
        }
    },

    logout: async () => {
        set({isLoading: true, error: null})
        try{
            await axios.post(`${baseURL}/logout`)
            set({user: null, isAuthenticated: false, error: null, isLoading: false})
        }catch(error){
            set({error: "Error logging out", isLoading: false})
            throw error
        }
    },

    forgotPassword: async (email) => {
        set({isLoading: true, error: null})
        try{
            await axios.post(`${baseURL}/forgot-password`, {email})
            set({isLoading: false, error: null})
        }catch(error){
            set({error: error.response?.data?.message || "Error sending password reset email", isLoading: false})
            throw error
        }
    },

    resetPassword: async (token, password) => {
         set({isLoading: true, error: null})
         try{
            const response = await axios.post(`${baseURL}/reset-password/${token}`, {password})
            set({isLoading: false, error: null})
         }catch(error){
            set({error: error.response?.data?.message || "Error resetting password ", isLoading: false})
            throw error
         }
    }
}))
