"use client"

import React, { useEffect } from 'react';
import { useCamperStore } from '@/lib/store';
import { CamperCard } from '../CamperCard/CamperCard';
import { LoadMoreButton } from '../LoadMoreButton/LoadMoreButton';
import css from "./CatalogList.module.css";

export const CatalogList = () => {
  const campers = useCamperStore(state => state.campers);
  const fetchCampers = useCamperStore(state => state.fetchCampers);
  const isLoading = useCamperStore(state => state.isLoading);
    
  useEffect(() => {
    fetchCampers(); 
  }, [fetchCampers]); 
  

  if (!isLoading && campers.length === 0) {
    return <p className={css.center}>No campers found for the selected criteria</p>;
  }

  return (
    <div className={css.catalogWrap}>
      {campers.length === 0 && isLoading ? (
        <p className={css.center}>Loading...</p>
      ) : (
        campers.length > 0 && (
        <>
          <ul className={css.catalogList}>
            {campers.map(camper => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </ul>
          <LoadMoreButton />
        </> )
      )}
    </div>
  );
};