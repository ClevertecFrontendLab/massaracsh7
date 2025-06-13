import { BloggerNote } from './bloggerTypes';

export type BaseSubCategory = {
    title: string;
    category: string;
    rootCategoryId: string;
};

export type CategorySub = BaseSubCategory & {
    _id: string;
};

export type SubCategory = BaseSubCategory;

export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
};

export type CategoryItem = Category | CategorySub;

export type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type RecipeStep = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type Ingredient = {
    title: string;
    count: number;
    measureUnit: string;
};

export type Unit = {
    _id: string;
    name: string;
};

export type Recipe = {
    _id: string;
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: RecipeStep[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
};

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipesResponse = {
    data: Recipe[];
    meta: Meta;
};

export type RecipesParams = Partial<{
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}>;

type OptionalCategoryParams = Partial<{
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
}>;

export type RecipesByCategoryParams = {
    id: string;
} & OptionalCategoryParams;

export type BuildQueryParams = Partial<{
    selectedAllergens: string[];
    selectedSubCategories: string[];
    selectedMeat: string[];
    selectedSide: string[];
    searchTerm: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    limit: number;
    page: number;
}>;

export type CreateRecipeDto = {
    title: string;
    description: string;
    time: number;
    portions: number;
    image: string;
    categoriesIds: string[];
    steps: RecipeStep[];
    ingredients: Ingredient[];
};

export type RecipeDraftDto = Partial<CreateRecipeDto>;
export type UpdateRecipeDto = Partial<CreateRecipeDto>;

export type MeasureUnit = {
    _id: string;
    name: string;
};

export type UploadResponse = {
    name: string;
    url: string;
    id: string;
};

export type RecipesByUser = {
    recipes: Recipe[];
    notes: BloggerNote[];
};
