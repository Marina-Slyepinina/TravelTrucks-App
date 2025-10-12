import { Camper, CamperFilters, Campers } from '@/types/camper';
import axios from 'axios';

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
const ITEMS_PER_PAGE = 4;

export const fetchCampersData = async (page:number, filters?: CamperFilters): Promise<{items: Camper[], totalCount: number}> => {
    try {
        const params: Record<string, string | number | boolean> = {
            page,
            limit: ITEMS_PER_PAGE,
        };
        
        if (filters?.location) {
            params.location = filters.location;
        }
        if (filters?.form) {
            params.form = filters.form;
        }
        if (filters?.transmission) {
            params.transmission = filters.transmission; 
        }
        if (filters?.engine) {
            params.engine = filters.engine;
        }        
      
        filters?.equipment.forEach(detail => {
            params[detail] = true; 
        });

        const response = await axios.get<Campers>("/campers", { params });

        const items = response.data.items;

        const totalCount = response.data.total;

        return { items, totalCount };

    } catch (error) {
    
    if (axios.isAxiosError(error) && error.response) {
      
      if (error.response.status === 404) {
        console.warn("404: Відсутність збігів фільтрації.");
        return { items: [], totalCount: 0 };
      }

      if (error.response.status === 400) { 
        console.warn("400: Недійсний запит через фільтри.");
        return { items: [], totalCount: 0 };
      }

      if (error.response.status === 429) {
        console.error("Помилка 429: Перевищено ліміт запитів. Спробуйте пізніше.");
        throw new Error("Помилка 429: Перевищено ліміт запитів. Спробуйте пізніше.");
      }

      console.error("Помилка Axios зі статусом:", error.response.status, error.message);
    } 
    throw error;
  }
}