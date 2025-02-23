export interface Category {
    id: string;
    name: string;
    type: 'Food' | 'Bar' | 'Hookah';
    position: number;
    created_at: string;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
    category_id: string;
    position: number;
    created_at: string;
    categories?: Category;
}

export interface Promos {
    id: string,
    name: string,
    desctiption: string,
    backgtound: string
}

export interface SortableCategoryProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}
export interface SortableMenuItemProps {
    item: MenuItem;
    categories: Category[];
    onEdit: (item: MenuItem) => void;
    onDelete: (id: string) => void;
}