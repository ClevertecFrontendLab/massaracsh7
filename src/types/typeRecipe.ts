export interface Ingredient {
    title: string;
    count: string;
    measureUnit: string;
}

export interface Step {
    stepNumber: number;
    description: string;
    image: string;
}

export interface NutritionValue {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    steps: Step[];
    meat?: string;
    side?: string;
}
