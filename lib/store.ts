import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchCampersData } from './api';
import { Camper, CamperFilters } from '@/types/camper';

interface CamperStoreState {
    campers: Camper[];
    currentPage: number;
    totalFiltered: number;
    isLoading: boolean;
    filters: CamperFilters;
    favorites: string[]; 
}

interface CamperStoreActions {
    setFilters: (newFilters: CamperFilters) => void;
    fetchCampers: () => void;
    hasNextPage: () => boolean;
    toggleFavorite: (camperId: string) => void;
}

type CamperStore = CamperStoreState & CamperStoreActions;

export const useCamperStore = create<CamperStore>()(persist((set, get) => ({
    campers: [],
    currentPage: 1,
    totalFiltered: 0,
    isLoading: true,
    filters: {
        location: '',
        form: '',
        transmission: '',
        engine: '',
        equipment: []
    },
    favorites: [],

    setFilters: (newFilters) => {
        set({
            filters: newFilters,
            currentPage: 1,
            campers: [],
            totalFiltered: 0,
        });
    },
    
    fetchCampers: async () => {

        set({ isLoading: true });

        const state = get();

        const shouldLoadNextPage = state.hasNextPage();

        const pageToFetch = shouldLoadNextPage ? state.currentPage + 1 : state.currentPage;

        try {
            const { items: newItems, totalCount } = await fetchCampersData(pageToFetch, state.filters);
            set({
                campers: shouldLoadNextPage ? [...state.campers, ...newItems] : newItems,
                totalFiltered: totalCount,
                currentPage: pageToFetch,
            });
        } catch (error) {
            console.error("Помилка завантаження кемперів:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    hasNextPage: () => {
        const state = get();

        console.log("state.campers.length ", state.campers.length);
        console.log("state.totalFiltered ", state.totalFiltered);
        return state.campers.length < state.totalFiltered;
    },
  
    toggleFavorite: (camperId) => {
        set(state => ({
            favorites: state.favorites.includes(camperId)
                ? state.favorites.filter(id => id !== camperId)
                : [...state.favorites, camperId],
        }));
    }
}),
    
    {
      name: 'camper-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), 
    }
));