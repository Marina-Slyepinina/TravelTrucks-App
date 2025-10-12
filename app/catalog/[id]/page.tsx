import { CamperDetails } from "@/components/CamperDetails/CamperDetails";
import { fetchCamperById } from "@/lib/api";


type CatalogItemProps = {
    params: Promise<{id: string}>
}

const CatalogItem = async ({ params }: CatalogItemProps) => {
    const { id } = await params;
    const camper = await fetchCamperById(id);

    return <section>
        <CamperDetails data={camper} />
    </section>;
}

export default CatalogItem;