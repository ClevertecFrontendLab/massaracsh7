export type BloggerNote = {
    date: string;
    text: string;
};

export type Blogger = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: BloggerNote[];
    newRecipesCount: number;
};

export type BloggersResponse = {
    favorites: Blogger[];
    others: Blogger[];
};
