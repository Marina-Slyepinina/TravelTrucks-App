import Link from "next/link";
import css from "./Header.module.css";

export const Header = () => {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <Link href="/" className={css.navLogo}>
                    <svg width={136} height={16}>
                        <use href="/sprite.svg#icon-TravelTrucks"></use>
                    </svg>
                </Link>
                <ul className={css.navList}>
                    <li className={css.navItem}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={css.navItem}>
                        <Link href="/catalog">Catalog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}