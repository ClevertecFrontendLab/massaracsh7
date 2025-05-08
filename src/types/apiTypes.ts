export interface BaseSubCategory {
    title: string;
    category: string;
    rootCategoryId: string;
}

export interface CategorySub extends BaseSubCategory {
    _id: string;
}

export type SubCategory = BaseSubCategory;

export interface Category {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
}

export type CategoryItem = Category | CategorySub;

export interface NutritionValue {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
}

export interface RecipeStep {
    stepNumber: number;
    description: string;
    image: string;
}

export interface Ingredient {
    title: string;
    count: string;
    measureUnit: string;
}

export interface Recipe {
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
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface RecipesResponse {
    data: Recipe[];
    meta: Meta;
}

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
