"use client"

import Image from 'next/image';
import { Camper } from "@/types/camper";
import css from "./CamperDetails.module.css";
import { useState } from 'react';

export const CamperDetails = ({ data }: { data: Camper }) => {
    
    const [activeTab, setActiveTab] = useState('Features');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    }

    return <section className={css.camperDetails}>
        <div className={css.camperDescr}>
            <div className={css.camperMainInfo}>

                <p className={css.camperTitle}>{data.name}</p>

                <div className={css.ratingAndLocationWrap}>
                    <div className={css.rating}>
                        <svg width={16} height={16} className={css.svgStar}>
                            <use href="/sprite.svg#icon-star"></use>
                        </svg>
                        {data.rating} ({data.reviews.length} Reviews)
                    </div>
                    <div className={css.location}>
                        <svg width={16} height={16} className={css.svgLocation}>
                            <use href="/sprite.svg#icon-map"></use>
                        </svg>
                        {data.location}
                    </div>
                </div>

                <p className={css.price}>€{data.price.toFixed(2)}</p>

            </div>

            <ul className={css.imgList}>
                {data.gallery.map((item, index) => <li key={item.thumb}>
                    <Image src={item.original} width={292} height={312} alt={`Camper photo ${index+1}`} className={css.camperImg}></Image>
                </li>)}
            </ul>

            <div className={css.text}>{data.description}</div>

        </div>

        <div className={css.camperFeaturesReviewsOrderFormWrap}>

            <div className={css.toggleButtonsWrap}>
                <h3 className={`${css.toggleButton} ${activeTab === 'Features' ? css.active : ''}`} onClick={() => handleTabClick('Features')}>Features</h3>
                <h3 className={`${css.toggleButton} ${activeTab === 'Reviews' ? css.active : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</h3>
            </div>

            {activeTab === 'Features' && (
                <div className={css.camperFeatures}>
                    <p>Features</p> 
                </div>
            )}
            
            {activeTab === 'Reviews' && (
                <div className={css.camperReviews}>
                    <p>Reviews</p>
                </div>
            )}
            
            <div className={css.orderForm}></div>
        </div>
        
    </section>
}