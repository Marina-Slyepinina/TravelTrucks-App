
import { create } from 'zustand';
import { fetchCampersData } from './api';
import { Camper, CamperFilters } from '@/types/camper';
import { createJSONStorage, persist } from 'zustand/middleware';

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
    fetchCamper: (isLoadMore?: boolean) => Promise<void>; 
    loadMore: () => void;
    getHasMore: () => boolean;
    toggleFavorite: (camperId: string) => void;
}

type CamperStore = CamperStoreState & CamperStoreActions;


export const useCamperStore = create<CamperStore>()(persist((set, get) => ({

    campers: [],
    currentPage: 1,
    totalFiltered: 0,
    isLoading: false,
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

    fetchCamper: async (isLoadMore = false) => {

        set({ isLoading: true });
        const state = get();

        const pageToFetch = isLoadMore ? state.currentPage + 1 : state.currentPage;

        try {

            const { items: newItems, totalCount } = await fetchCampersData(pageToFetch, state.filters);

            set(state => ({
                campers: isLoadMore ? [...state.campers, ...newItems] : newItems,
                currentPage: pageToFetch,
                totalFiltered: totalCount,
            }));
            
            set({ isLoading: false });

        } catch (error) {

            if (!isLoadMore) {
                set({ campers: [], totalFiltered: 0 });
            }
            set({ isLoading: false });
            console.error("Помилка завантаження даних:", error);

        } finally {
            set({ isLoading: false });
        }
    },

    loadMore: () => {
        if (get().getHasMore()) {
            get().fetchCamper(true);
        }
    },

    getHasMore: () => {
        const state = get();
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