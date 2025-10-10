import { FiltersList } from "../FiltersList/FiltersList"
import css from "./FiltersBlock.module.css";

type FiltersBlockData = {name: string, icon: string}

interface FiltersBlockProps {
    title: string,
    data: FiltersBlockData[]
}

export const FiltersBlock = ({title, data}: FiltersBlockProps) => {
    return (
        <div className={css.filtersWrap}>
            <p className={css.filtersTitle}>{title}</p>
            <FiltersList data={data}/>
        </div>
    )
}