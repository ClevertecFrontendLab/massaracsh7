import { Middleware } from '@reduxjs/toolkit';

import { categoriesApiSlice } from '~/query/services/categories';
import { recipesApiSlice } from '~/query/services/recipes';

import { setAppLoader } from '../app-slice';

const LOADER_ENDPOINTS = [
    categoriesApiSlice.endpoints.getCategories.matchFulfilled,
    recipesApiSlice.endpoints.getRecipes.matchFulfilled,
];

let loadCount = 0;
const MAX_LOAD_COUNT = 2;

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
    if (LOADER_ENDPOINTS.some((matchFn) => matchFn(action))) {
        loadCount += 1;

        if (loadCount >= MAX_LOAD_COUNT) {
            store.dispatch(setAppLoader(false));
        }
    }

    return next(action);
};
