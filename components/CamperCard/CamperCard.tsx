import Image from 'next/image';
import Link from 'next/link';
import { useCamperStore } from '@/lib/store';
import { Camper } from '@/types/camper';
import { FilterDataItem, OtherFilters, VehicleTypeFilters } from '@/utils/filterData';
import clsx from 'clsx';
import css from "./CamperCard.module.css";



interface CamperCardProps {
 camper: Camper;
}

export const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
 const toggleFavorite = useCamperStore(state => state.toggleFavorite);
 const isFavorite = useCamperStore(state => state.favorites.includes(camper.id));

 const allDisplayFeatures: FilterDataItem[] = [...OtherFilters.data, ...VehicleTypeFilters.data];

 const activeFeatures = allDisplayFeatures.map(item => {
    const { filterKey, name, label, icon } = item;
    let isAvailable = false;

    if (filterKey === 'form') {
      isAvailable = camper.form === name;
    } else if (filterKey === 'transmission' || filterKey === 'engine') {
      isAvailable = camper[filterKey as 'transmission' | 'engine'] === name;
    } else if (filterKey === 'equipment') {
      isAvailable = camper[name as keyof Camper] === true;
    }

    return { label, icon, isAvailable };

  }).filter(f => f.isAvailable);

  const imageUrl = (camper.gallery?.[0]?.thumb) as string;
  const imageAlt = camper.name;

 return (
  <li className={css.card}>
    <Image src={imageUrl} alt={imageAlt} className={css.image} width={292} height={320} />

    <div className={css.details}>
      
      <div className={css.headerWrap}>
        <div className={css.header}>
          <h2 className={css.name}>{camper.name}</h2>
          <div className={css.priceSection}>
            <span className={css.price}>€{camper.price.toFixed(2)}</span>
            <button onClick={() => toggleFavorite(camper.id)} className={css.favoriteButton}>
              <svg width={24} height={24} className={clsx(css.svgLike, isFavorite && css.selected)}>
                <use href="/sprite.svg#icon-like"></use>
              </svg>
            </button>
          </div>
        </div>
        
        <div className={css.ratingAndLocationWrap}>
          <div className={css.rating}>
              <svg width={16} height={16} className={css.svgStar}>
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              {camper.rating} ({camper.reviews.length} Reviews)
          </div>
          <div className={css.location}>
              <svg width={16} height={16} className={css.svgLocation}>
                <use href="/sprite.svg#icon-map"></use>
              </svg>
              {camper.location}
          </div>
        </div>
      </div>

      <p className={css.description}>{camper.description.substring(0, 60)}...</p>

      <ul className={css.features}>
        {activeFeatures.map(feature => (
          <li key={feature.label} className={css.featureItem}>
              <svg width={20} height={20} className={css.svgFeatures}>
                <use href={feature.icon}></use>
              </svg>
              {feature.label}
          </li>
        ))}
      </ul>

      <Link href={`/catalog/${camper.id}`} className={css.showMoreButton}>Show more</Link>
   </div>
  </li>
 );
};