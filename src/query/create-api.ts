import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryToken } from '~/utils/fetchBaseQueryToken';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: () => ({}),
});

export const catalogApiSlice = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQueryToken,
    endpoints: () => ({}),
});
