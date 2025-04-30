import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: () => ({}),
});

export const catalogSlice = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru' }),
    endpoints: () => ({}),
});
