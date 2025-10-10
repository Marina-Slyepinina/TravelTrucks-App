"use client"

import { Reuleaux } from 'ldrs/react'
import 'ldrs/react/Reuleaux.css'
import css from "./Loader.module.css";

interface LoaderProps {
    size?: number;
    stroke?: number;
    strokeLength?: number;
    bgOpacity?: number;
    speed?: number;
    color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
    size = 37, 
    stroke = 5,
    strokeLength = 0.15,
    bgOpacity = 0.2,
    speed = 1.2,
    color = '#FFFFFF', 
}) => {

    return (
        <div className={css.overlay}>
            <Reuleaux
            size={size}
            stroke={stroke}
            strokeLength={strokeLength}
            bgOpacity={bgOpacity}
            speed={speed}
            color={color}
            />
        </div>
    )
}

