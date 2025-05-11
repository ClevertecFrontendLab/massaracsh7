import { Middleware } from '@reduxjs/toolkit';

import { categoriesApiSlice } from '~/query/services/categories';
import { recipesApiSlice } from '~/query/services/recipes';

import { setAppLoader } from '../app-slice';

const START_LOAD = [
    categoriesApiSlice.endpoints.getCategories.matchPending,
    recipesApiSlice.endpoints.getRecipes.matchPending,
];

const END_LOAD = [
    categoriesApiSlice.endpoints.getCategories.matchFulfilled,
    categoriesApiSlice.endpoints.getCategories.matchRejected,
    recipesApiSlice.endpoints.getRecipes.matchFulfilled,
    recipesApiSlice.endpoints.getRecipes.matchRejected,
];

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
    if (START_LOAD.some((match) => match(action))) {
        store.dispatch(setAppLoader(true));
    }

    if (END_LOAD.some((match) => match(action))) {
        store.dispatch(setAppLoader(false));
    }

    return next(action);
};
