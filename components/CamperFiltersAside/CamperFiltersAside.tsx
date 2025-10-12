"use client"

import React, { useState } from 'react';
import { useCamperStore } from '@/lib/store';
import { CamperEquipment, CamperFilters } from '@/types/camper';
import { FilterDataItem, FilterGroup, OtherFilters, VehicleTypeFilters } from '@/utils/filterData';
import clsx from 'clsx';
import css from "./CamperFiltersAside.module.css";


export const CamperFiltersAside = () => {
    const setFilters = useCamperStore(state => state.setFilters);
    const fetchCamper = useCamperStore(state => state.fetchCamper);
    const currentFilters = useCamperStore(state => state.filters);

    const [localFilters, setLocalFilters] = useState<CamperFilters>(currentFilters);
    
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters({ ...localFilters, location: e.target.value });
    };

    const handleFilterClick = (item: FilterDataItem) => {
        const { filterKey, name } = item;

        if (filterKey === 'equipment') {
            const equipmentName = name as CamperEquipment;
            const { equipment } = localFilters;
            const newEquipment = equipment.includes(equipmentName)
                ? equipment.filter(eq => eq !== equipmentName)
                : [...equipment, equipmentName];
            setLocalFilters({ ...localFilters, equipment: newEquipment });
        
        } else if (filterKey === 'form' || filterKey === 'transmission' || filterKey === 'engine') {
            const currentSelectedValue = localFilters[filterKey];
            
            const newValue = currentSelectedValue === name ? '' : name;
            
            setLocalFilters({ ...localFilters, [filterKey]: newValue });
        }
    };    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters(localFilters);
        console.log("localFilters ", localFilters);
        fetchCamper();
    };
    
    const isSelected = (item: FilterDataItem): boolean => {
        const { filterKey, name } = item;
        
        if (filterKey === 'equipment') {
            return localFilters.equipment.includes(name as CamperEquipment);
        } else if (filterKey === 'form' || filterKey === 'transmission' || filterKey === 'engine') {
            return localFilters[filterKey] === name;
        }
        return false;
    };

    const renderFilterGroup = (group: FilterGroup) => (
      <div className={css.filterGroupWrap}>
        <h3 className={css.filterGroupTitle}>{group.title}</h3>
        <div className={css.filtersWrap}>
            {group.data.map(item => (
                <div 
                    key={item.name} 
                    onClick={() => handleFilterClick(item)}
                    className={clsx(css.filterItem, isSelected(item) && css.selected)}
                >
                    <svg width={20} height={20} className={css.filterIcon}>
                        <use href={item.icon}></use>
                    </svg>
                    <span className={css.filterLabel}>{item.label}</span>
                </div>
            ))}
        </div>
      </div>
    );


    return (
        <form onSubmit={handleSubmit} className={css.form}>
            
            <div className={css.locationWrap}>
                <label htmlFor="location" className={css.locationTitle}>Location</label>
                <input 
                    id="location"
                    type="text" 
                    value={localFilters.location}
                    onChange={handleLocationChange}
                    placeholder="City"
                    className={css.locationInput}
                />
            </div>

            <div className={css.allFiltersGroupWrap}>
                <p className={css.mainAllFiltersTitle}>Filters</p>
                {renderFilterGroup(OtherFilters)}
                {renderFilterGroup(VehicleTypeFilters)}
            </div>
            
            <button type="submit" className={css.button}>Search</button>
        </form>
    );
};