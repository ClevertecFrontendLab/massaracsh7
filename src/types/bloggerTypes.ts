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

export type DraftItem = {
    _id: string;
    title: string;
};

export type DraftsList = DraftItem[];

export type RecipesIds = string[];
export type Subscribers = string[];
export type Subscriptions = string[];

export type BloggerInfo = {
    drafts: DraftsList;
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    recipesIds: RecipesIds;
    subscribers: Subscribers;
    subscriptions: Subscriptions;
};

export type BloggerByIdResponse = {
    bloggerInfo: BloggerInfo;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
};
