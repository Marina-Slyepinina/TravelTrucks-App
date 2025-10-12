import React from 'react';
import { useCamperStore } from '@/lib/store';
import css from "./LoadMoreButton.module.css";

export const LoadMoreButton: React.FC = () => {
  const loadMore = useCamperStore(state => state.loadMore);
  const isLoading = useCamperStore(state => state.isLoading);
  const hasMore = useCamperStore(state => state.getHasMore());
  const totalLoaded = useCamperStore(state => state.campers.length);

  if (!hasMore || totalLoaded === 0) {
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