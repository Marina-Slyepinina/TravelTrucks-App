import Link from "next/link";
import css from "./Hero.module.css";

export const Hero = () => {
    return (
        <section className={css.heroWrap}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>You can find everything you want in our catalog</p>
            <Link href="/catalog" className={css.button}>View Now</Link>
        </section>
    )
}