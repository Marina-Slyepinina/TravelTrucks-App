import { CamperEngine, CamperEquipment, CamperTransmission, CamperVehicleType } from "@/types/camper";

export interface FilterGroup {
    title: string;
    filterKey: 'form' | 'equipment' | 'transmission' | 'engine';
    data: FilterDataItem[];
}

export interface FilterDataItem {
    label: string;
    name: CamperVehicleType | CamperTransmission | CamperEngine | CamperEquipment;
    icon: string;
    filterKey: 'form' | 'transmission' | 'engine' | 'equipment'; 
}

export const VehicleTypeFilters: FilterGroup = {
    title: "Vehicle equipment",
    filterKey: 'form',
    data: [
        {label: "Van", name: "panelTruck", icon: "/sprite.svg#icon-bi_grid-1x2", filterKey: 'form'},
        {label: "Fully Integrated", name: "fullyIntegrated", icon: "/sprite.svg#icon-bi_grid", filterKey: 'form'},
        {label: "Alcove", name: "alcove", icon: "/sprite.svg#icon-bi_grid-3x3-gap", filterKey: 'form'},
    ]
};

export const OtherFilters: FilterGroup = {
    title: "Vehicle type",
    filterKey: 'equipment',
    data: [
        //(Transmission)
        {label: "Automatic", name: "automatic", icon: "/sprite.svg#icon-diagram", filterKey: 'transmission'},
        {label: "Manual", name: "manual", icon: "/sprite.svg#icon-diagram", filterKey: 'transmission'},
        
        //(Engine)
        {label: "Petrol", name: "petrol", icon: "/sprite.svg#icon-engine", filterKey: 'engine'},
        {label: "Diesel", name: "diesel", icon: "/sprite.svg#icon-engine", filterKey: 'engine'},
        {label: "Hybrid", name: "hybrid", icon: "/sprite.svg#icon-engine", filterKey: 'engine'},
        
        //(Equipment - Булеві)
        {label: "AC", name: "AC", icon: "/sprite.svg#icon-wind", filterKey: 'equipment'},
        {label: "Bathroom", name: "bathroom", icon: "/sprite.svg#icon-ph_shower", filterKey: 'equipment'},
        {label: "Kitchen", name: "kitchen", icon: "/sprite.svg#icon-cup-hot", filterKey: 'equipment'},
        {label: "TV", name: "TV", icon: "/sprite.svg#icon-tv", filterKey: 'equipment'},
        {label: "Radio", name: "radio", icon: "/sprite.svg#icon-radio", filterKey: 'equipment'},
        {label: "Refrigerator", name: "refrigerator", icon: "/sprite.svg#icon-solar_fridge-outline", filterKey: 'equipment'},
        {label: "Microwave", name: "microwave", icon: "/sprite.svg#icon-lucide_microwave", filterKey: 'equipment'},
        {label: "Gas", name: "gas", icon: "/sprite.svg#icon-hugeicons_gas-stove", filterKey: 'equipment'},
        {label: "Water", name: "water", icon: "/sprite.svg#icon-ion_water-outline", filterKey: 'equipment'},
    ]
};