import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice, catalogApiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import categoriesReducer, { categoriesSlice } from './category-slice';
import filtersReducer, { filtersSlice } from './filter-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filtersSlice.name]: filtersReducer,
    [categoriesSlice.name]: categoriesReducer,
    [catalogApiSlice.reducerPath]: catalogApiSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(catalogApiSlice.middleware),
    devTools: !isProduction,
});
