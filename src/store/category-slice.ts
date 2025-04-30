import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
