import { PromoItem } from "./PromoItem"

export const PromoList = ({ isOpen, promos }) => {
    return isOpen && <div className="grid gap-4">
        {promos.map(promo => (
            <PromoItem promo={promo} onEdit={(el) => { console.log(el) }} onDelete={(el) => { console.log(el) }} />
        ))}
    </div>
}