export interface CardData {
    title: string;
    description: string;
    category: BadgeCategory;
    likes: number;
    comments: number;
    imageUrl: string;
    recomended?: BlogData;
}

export interface BadgeCategory {
    title: string;
    icon: string;
}

export interface CardSliderData {
    title: string;
    description: string;
    category: BadgeCategory;
    likes: number;
    comments: number;
    imageUrl: string;
}

export interface BlogData {
    name: string;
    username: string;
    description: string;
    imageUrl: string;
}

export interface KitchenDish {
    title: string;
    category: BadgeCategory;
    description: string;
    likes: number;
    comments: number;
}

export interface TryDish {
    title: string;
    icon: string;
}
