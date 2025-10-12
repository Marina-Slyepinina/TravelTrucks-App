import Image from 'next/image';
import { Camper } from "@/types/camper";
import css from "./CamperDetails.module.css";

export const CamperDetails = ({data}: {data: Camper}) => {

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
        {/* Features and Reviews Components*/}
        <div className={css.camperFeaturesReviewsOrderFormWrap}>
            <div className={css.camperFeatures}></div>
            <div className={css.camperReviews}></div>
            <div className={css.orderForm}></div>
        </div>
        
    </section>
}