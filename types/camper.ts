export type CamperVehicleType = "panelTruck" | "alcove" | "fullyIntegrated";
export type CamperTransmission = "automatic" | "manual";
export type CamperEngine = "petrol" | "diesel"| "hybrid";

interface CamperImg {
    thumb: string,
    original: string,
}

interface CamperReview {
    reviewer_name: string,
    reviewer_rating: number,
    comment: string,
}

export type CamperEquipment = 'AC' | 'bathroom' | 'kitchen' | 'TV' | 'radio' | 'refrigerator' | 'microwave' | 'gas' | 'water';

export interface Camper {
    id: string,
    name: string,
    price: number,
    rating: number,
    location: string,
    description: string,
    form: CamperVehicleType,
    length: string,
    width: string,
    height: string,
    tank: string,
    consumption: string,
    transmission: CamperTransmission,
    engine: CamperEngine,
    AC: boolean,
    bathroom: boolean,
    kitchen: boolean,
    TV: boolean,
    radio: boolean,
    refrigerator: boolean,
    microwave: boolean,
    gas: boolean,
    water: boolean,
    gallery: CamperImg[],
    reviews: CamperReview[]
}

export interface Campers {
    total: number,
    items: Camper[]
}

export interface CamperFilters {
    location: string; 
    form: CamperVehicleType | string; 
    transmission: CamperTransmission | string; 
    engine: CamperEngine | string; 
    equipment: CamperEquipment[]; 
}