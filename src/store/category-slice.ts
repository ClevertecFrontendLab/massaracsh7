import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { categoriesApiSlice } from '~/query/services/categories';
import { Category, CategorySub } from '~/types/apiTypes';

import { ApplicationState } from './configure-store';

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
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

const selectCategoriesState = (state: ApplicationState) => state.categories;

export const selectAllCategories = createSelector(
    [selectCategoriesState],
    (state) => state.categories,
);

export const selectAllSubCategories = createSelector(
    [selectCategoriesState],
    (state) => state.subCategories,
);

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
