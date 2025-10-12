"use client"

import React, { useEffect } from 'react';
import { useCamperStore } from '@/lib/store';
import { CamperCard } from '../CamperCard/CamperCard';
import { LoadMoreButton } from '../LoadMoreButton/LoadMoreButton';
import css from "./CatalogList.module.css";


export const CatalogList: React.FC = () => {
  const campers = useCamperStore(state => state.campers);
  const fetchCamper = useCamperStore(state => state.fetchCamper);
  const totalFiltered = useCamperStore(state => state.totalFiltered);

  useEffect(() => {
    fetchCamper(false); 
  }, [fetchCamper]); 

  if (totalFiltered === 0) {
    return <p className={css.textNotFound}>No campers found for the selected criteria</p>;
  }

  return (
    <div className={css.catalogWrap}>

      <ul className={css.catalogList}>
        {campers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>

      <LoadMoreButton />
      
    </div>
  );
};

