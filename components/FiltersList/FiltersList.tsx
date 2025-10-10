import css from "./FiltersList.module.css";

type FiltersListItem = {name: string, icon: string}
type FiltersListProps = {data: FiltersListItem[]}

export const FiltersList = ({data}: FiltersListProps) => {
    return (
        <ul className={css.filtersList}>
            {data.map((item) => (
                <li key={item.name} className={css.filtersItem}>
                    <svg width={20} height={20} className={css.filterIcon}>
                        <use href={item.icon}></use>
                    </svg>
                    <p className={css.filterName}>{item.name}</p>
                </li>
            ))}
        </ul>
    )
}