import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    isVet: JSON.parse(localStorage.getItem('isVet')) || false,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    clientId: localStorage.getItem('clientId') || null,
    vetId: localStorage.getItem('vetId') || null,
    petId: localStorage.getItem('petId') || null,
    appointmentId: localStorage.getItem('appointmentId') || null,

    setIsAuthenticated: (value) => {
        localStorage.setItem('isAuthenticated', JSON.stringify(value));
        set({ isAuthenticated: value });
    },

    setIsVet: (value) => {
        localStorage.setItem('isVet', JSON.stringify(value));
        set({ isVet: value });
    },
    setIsAdmin: (value) => {
        localStorage.setItem('isAdmin', JSON.stringify(value));
        set({ isAdmin: value });
    },

    setClientId: (clientId) => {
        localStorage.setItem('clientId', clientId);
        set({ clientId });
    },

    setVetId: (vetId) => {
        localStorage.setItem('vetId', vetId);
        set({ vetId });
    },

    setPetId: (petId) => {
        localStorage.setItem('petId', petId);
        set({ petId });
    },

    setAppointmentId: (appointmentId) => {
        localStorage.setItem('appointmentId', appointmentId);
        set({ appointmentId });
    },

    logout: () => {
        localStorage.clear();
        set({
            isAuthenticated: false,
            isVet: false,
            isAdmin: false,
            clientId: null,
            vetId: null,
            petId: null,
            appointmentId: null
        });
    }

}));
