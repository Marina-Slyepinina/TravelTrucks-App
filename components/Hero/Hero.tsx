import Link from "next/link";
import css from "./Hero.module.css";

export const Hero = () => {
    return (
        <section className={css.heroWrap}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>You can find everything you want in our catalog</p>
            <button type="button" className={css.button}>
                <Link href="/catalog">View Now</Link>
            </button>
        </section>
    )
}