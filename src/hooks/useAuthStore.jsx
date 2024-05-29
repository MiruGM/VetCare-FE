import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    isVet: JSON.parse(localStorage.getItem('isVet')) || false,
    clientId: localStorage.getItem('clientId') || null,

    setIsAuthenticated: (value) => {
        localStorage.setItem('isAuthenticated', JSON.stringify(value));
        set({ isAuthenticated: value });
    },

    setIsVet: (value) => {
        localStorage.setItem('isVet', JSON.stringify(value));
        set({ isVet: value });
    },

    setClientId: (clientId) => {
        localStorage.setItem('clientId', clientId);
        set({ clientId });
    },

}));
