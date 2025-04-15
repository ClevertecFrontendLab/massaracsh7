export interface SubcategoryItem {
    subcategory: string;
    title: string;
}

export interface Category {
    title: string;
    icon: string;
    url: string;
    items: SubcategoryItem[];
}
