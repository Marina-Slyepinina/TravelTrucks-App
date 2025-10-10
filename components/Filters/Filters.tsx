import { FiltersBlock } from "../FiltersBlock/FiltersBlock"
import css from "./Filters.module.css";

const VehicleTypeFilters = {
    title: "Vehicle equipment", //form (у БД)
    data: [
        {name: "Van", icon: "/sprite.svg#icon-bi_grid-1x2"},  //form: "panelTruck" (у БД)
        {name: "Fully Integrated", icon: "/sprite.svg#icon-bi_grid"}, //form: "fullyIntegrated" (у БД)
        {name: "Alcove", icon: "/sprite.svg#icon-bi_grid-3x3-gap"},//form: "alcove" (у БД)
    ]
}


const VehicleEquipmentFilters = {
    title: "Vehicle type",
    data: [
        {name: "Automatic", icon: "/sprite.svg#icon-diagram"}, //transmission: "automatic" (у БД)
        {name: "Manual", icon: "/sprite.svg#icon-diagram"}, //transmission: "manual" (у БД)
        {name: "Hybrid", icon: "/sprite.svg#icon-diagram"}, //transmission: "hybrid" (у БД)
        {name: "Petrol", icon: "/sprite.svg#icon-engine"}, //engine: "petrol" (у БД)
        {name: "Diesel", icon: "/sprite.svg#icon-engine"}, //engine: "diesel" (у БД)
        {name: "AC", icon: "/sprite.svg#icon-wind"}, //AC: boolean (у БД)
        {name: "Bathroom", icon: "/sprite.svg#icon-ph_shower"}, //bathroom: boolean (у БД)
        {name: "Kitchen", icon: "/sprite.svg#icon-cup-hot"}, //kitchen: boolean (у БД)
        {name: "TV", icon: "/sprite.svg#icon-tv"}, //TV: boolean (у БД)
        {name: "Radio", icon: "/sprite.svg#icon-radio"}, //radio: boolean (у БД)
        {name: "Refrigerator", icon: "/sprite.svg#icon-solar_fridge-outline"}, //refrigerator: boolean (у БД)
        {name: "Microwave", icon: "/sprite.svg#icon-lucide_microwave"}, //microwave: boolean (у БД)
        {name: "Gas", icon: "/sprite.svg#icon-hugeicons_gas-stove"}, //gas: boolean (у БД)
        {name: "Water", icon: "/sprite.svg#icon-ion_water-outline"} //water: boolean (у БД)
    ]
}

export const Filters = () => {
    return (
        <section className={css.filtersWrap}>
            <p className={css.title}>Filters</p>
            <FiltersBlock title={VehicleEquipmentFilters.title} data={VehicleEquipmentFilters.data} />
            <FiltersBlock title={VehicleTypeFilters.title} data={VehicleTypeFilters.data} />
        </section>
    )
}