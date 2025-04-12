export interface BadgeCategory {
    title: string;
    icon: string;
}

export interface BlogData {
    name: string;
    username: string;
    description: string;
    imageUrl: string;
}

export interface BaseCard {
    title: string;
    description: string;
    category: BadgeCategory;
    likes: number;
    comments: number;
}

export interface CardSliderData extends BaseCard {
    imageUrl: string;
}

export interface CardData extends CardSliderData {
    recomended?: BlogData;
    imageUrl: string;
}

export interface KitchenDish extends BaseCard {}

export interface TryDish {
    title: string;
    icon: string;
}
