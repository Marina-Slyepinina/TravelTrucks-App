"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export const Header = () => {

    const pathname = usePathname();

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
                        <Link href="/" className={pathname === "/" ? css.active : ""}>Home</Link>
                    </li>
                    <li className={css.navItem}>
                        <Link href="/catalog" className={pathname === "/catalog" ? css.active : ""}>Catalog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}