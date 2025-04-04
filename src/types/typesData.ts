export interface CardData {
    title: string;
    description: string;
    category: string;
    likes: number;
    comments: number;
    imageUrl: string;
}

export interface BlogData {
    name: string;
    handle: string;
    description: string;
    imageUrl: string;
}

export interface VeganDish {
    title: string;
    category: string;
    description: string;
    likes: number;
    comments: number;
}

export interface TryDish {
    title: string;
    icon: string;
}
