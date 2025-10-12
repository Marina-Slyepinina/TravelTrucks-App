"use client"

import Image from 'next/image';
import { Camper } from "@/types/camper";
import css from "./CamperDetails.module.css";
import { useState } from 'react';
import { OtherFilters, VehicleTypeFilters } from '@/utils/filterData';
import { OrderForm } from '../OrderForm/OrderForm';

interface FeatureItem {
    label: string;
    icon: string;
}

export const CamperDetails = ({ data }: { data: Camper }) => {
    
    const [activeTab, setActiveTab] = useState('Features');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    }

    const filtersData = [...OtherFilters.data];

    const getAvailableFeatures = (camperData: Camper) => {
        const features: FeatureItem[] = [];
        
        filtersData.forEach(filter => {
            const { name, label, icon, filterKey } = filter;
            
            if (filterKey === 'transmission' || filterKey === 'engine') {
                if (camperData[filterKey as keyof Camper] === name) {
                    features.push({ label, icon });
                }
            } 

            else if (filterKey === 'equipment') {
                if (camperData[name as keyof Camper] === true) {
                    features.push({ label, icon });
                }
            }
        });

        return features;
    };

    const availableFeatures = getAvailableFeatures(data);

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

            <div className={css.container}>
                {activeTab === 'Features' && (
                    <section className={css.camperFeatures}>
                        <ul className={css.camperFeaturesFilters}>
                            {availableFeatures.map((feature, index) => (
                                <li key={index} className={css.featureItem}>
                                    <svg className={css.featureIcon} width={20} height={20}>
                                        <use href={feature.icon}></use>
                                    </svg>
                                    <span className={css.featureText}>{feature.label}</span>
                                </li>
                            ))}
                        </ul>
                        <div className={css.camperFeaturesDetails}>
                            <h2 className={css.detailsHeader}>Vehicle details</h2>
                            <div className={css.detailsDivider}></div>
                            <ul className={css.detailsList}>
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Form</span>
                                    <span className={css.detailsValue}>
                                    {VehicleTypeFilters.data.find(f => f.name === data.form)?.label || data.form}
                                    </span>
                                </div>
                
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Length</span>
                                    <span className={css.detailsValue}>{data.length}</span>
                                </div>
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Width</span>
                                    <span className={css.detailsValue}>{data.width}</span>
                                </div>
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Height</span>
                                    <span className={css.detailsValue}>{data.height}</span>
                                </div>
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Tank</span>
                                    <span className={css.detailsValue}>{data.tank}</span>
                                </div>
                                <div className={css.detailsRow}>
                                    <span className={css.detailsTerm}>Consumption</span>
                                    <span className={css.detailsValue}>{data.consumption}</span>
                                </div>
                            </ul>
                        </div>
                    </section>
                )}
                
                {activeTab === 'Reviews' && (
                    <section className={css.camperReviews}>
                        <ul className={css.reviewsList}>
                            {data.reviews.map((item, index) => {
                                const renderRatingStars = (rating: number) => {
                                    const stars = [];
                                    for (let i = 1; i <= 5; i++) {
                                        stars.push(
                                            <svg key={i} className={`${i <= rating ? css.starFull : css.starEmpty}`} width={16} height={16}>
                                                <use href="/sprite.svg#icon-star"></use>
                                            </svg>
                                        );
                                    }
                                    return stars;
                                };
                                return <li key={index} className={css.reviewsItem}>
                                    <div className={css.reviewsHeader}>
                                        <div className={css.reviewsAvatar}>
                                            {item.reviewer_name[0]}
                                        </div>
                                        <div>
                                            <p className={css.reviewsName}>{item.reviewer_name}</p>
                                            <div className={css.reviewsRating}>
                                                {renderRatingStars(item.reviewer_rating)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className={css.reviewsComment}>{item.comment}</p>
                                </li>
                            })}
                
                        </ul>
                    </section>
                )}
                <OrderForm id={data.id} />
            </div>
        </div>
        
    </section>
}