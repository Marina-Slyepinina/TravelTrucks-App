type CamperVehicleType = "panelTruck" | "alcove" | "fullyIntegrated";
type CamperTransmission = "automatic" | "manual" | "hybrid";
type CamperEngine = "petrol" | "diesel";

interface CamperImg {
    thumb: string,
    original: string,
}

interface CamperReview {
    reviewer_name: string,
    reviewer_rating: number,
    comment: string,
}

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