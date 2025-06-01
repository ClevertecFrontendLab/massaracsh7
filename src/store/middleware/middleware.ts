import { Middleware } from '@reduxjs/toolkit';

import { authApiSlice } from '~/query/services/auth';
import { categoriesApiSlice } from '~/query/services/categories';
import { recipesApiSlice } from '~/query/services/recipes';

import { setAppLoader } from '../app-slice';

let loadCount = 0;
const MAX_LOAD_COUNT = 2;
const MIN_LOAD_COUNT = 1;

let isInitialAppLoad = true;

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
    let waitLoad;
    if (recipesApiSlice.endpoints.getRecipes.matchPending(action)) {
        waitLoad = MAX_LOAD_COUNT;
    } else {
        waitLoad = MIN_LOAD_COUNT;
    }

    if (
        authApiSlice.endpoints.login.matchPending(action) ||
        authApiSlice.endpoints.verifyOtp.matchPending(action) ||
        authApiSlice.endpoints.resetPassword.matchPending(action)
    ) {
        store.dispatch(setAppLoader(true));
    }

    if (
        authApiSlice.endpoints.login.matchFulfilled(action) ||
        authApiSlice.endpoints.login.matchRejected(action) ||
        authApiSlice.endpoints.verifyOtp.matchFulfilled(action) ||
        authApiSlice.endpoints.verifyOtp.matchRejected(action) ||
        authApiSlice.endpoints.resetPassword.matchFulfilled(action) ||
        authApiSlice.endpoints.resetPassword.matchRejected(action)
    ) {
        store.dispatch(setAppLoader(false));
    }

    if (isInitialAppLoad) {
        if (
            categoriesApiSlice.endpoints.getCategories.matchFulfilled(action) ||
            recipesApiSlice.endpoints.getRecipes.matchFulfilled(action)
        ) {
            loadCount += 1;

            if (loadCount >= waitLoad) {
                store.dispatch(setAppLoader(false));
                isInitialAppLoad = false;
                loadCount = 0;
            }
        }
    }

    return next(action);
};
