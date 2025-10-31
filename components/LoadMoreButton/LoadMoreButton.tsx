import React from 'react';
import { useCamperStore } from '@/lib/store';
import css from "./LoadMoreButton.module.css";

export const LoadMoreButton = () => {

  const hasNextPage = useCamperStore((state) => state.hasNextPage()); 
  const loadMore = useCamperStore((state) => state.fetchCampers);
  const isLoading = useCamperStore((state) => state.isLoading);

  if (!hasNextPage) {
      return null;
  }

  return (
    <button
      onClick={loadMore}
      disabled={isLoading}
      className={css.button}
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
};