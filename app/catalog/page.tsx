import { CatalogList } from "@/components/CatalogList/CatalogList";
import { CamperFiltersAside } from "@/components/CamperFiltersAside/CamperFiltersAside";
import css from "./Catalog.module.css";

const Catalog = async () => {

    return <div className={css.catalog}>
        <CamperFiltersAside />
        <CatalogList />
    </div>;
}

export default Catalog;