import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { categoriesApiSlice } from '~/query/services/categories';
import { Category, CategorySub } from '~/types/apiTypes';

export interface CategoriesState {
    categories: Category[];
    subCategories: CategorySub[];
}

const initialState: CategoriesState = {
    categories: [],
    subCategories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<(Category | CategorySub)[]>) => {
            state.categories = action.payload.filter(
                (item) => (item as Category).subCategories !== undefined,
            ) as Category[];
            state.subCategories = action.payload.filter(
                (item) => (item as CategorySub).rootCategoryId !== undefined,
            ) as CategorySub[];
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            categoriesApiSlice.endpoints.getCategories.matchFulfilled,
            (state, action: PayloadAction<(Category | CategorySub)[]>) => {
                state.categories = action.payload.filter(
                    (item) => (item as Category).subCategories !== undefined,
                ) as Category[];
                state.subCategories = action.payload.filter(
                    (item) => (item as CategorySub).rootCategoryId !== undefined,
                ) as CategorySub[];
            },
        );
    },
    selectors: {
        selectAllCategories: (state: CategoriesState): Category[] => state.categories,
        selectAllSubCategories: (state: CategoriesState): CategorySub[] => state.subCategories,
    },
});
export const selectCategoryBySlug = (slug: string) =>
    createSelector([selectAllCategories], (categories) =>
        categories.find((cat: Category) => cat.category === slug),
    );

export const selectSubCategoryBySlug = (slug: string) =>
    createSelector([selectAllSubCategories], (subcategories) =>
        subcategories.find((sub: CategorySub) => sub.category === slug),
    );

export const selectSubCategoriesByRootId = (rootId: string) =>
    createSelector([selectAllSubCategories], (subcategories) =>
        subcategories.filter((sub: CategorySub) => sub.rootCategoryId === rootId),
    );
export const { setCategories } = categoriesSlice.actions;

export const { selectAllCategories, selectAllSubCategories } = categoriesSlice.selectors;

export default categoriesSlice.reducer;
