import {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { getAccessToken, isTokenExpired, removeTokens, saveAccessToken } from './tokenUtils';

const API_BASE_URL = 'https://marathon-api.clevertec.ru';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
});

export const fetchBaseQueryToken: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api: BaseQueryApi, extraOptions) => {
    let accessToken = getAccessToken();

    if (accessToken && isTokenExpired(accessToken)) {
        const refreshResult = await rawBaseQuery(
            {
                url: '/auth/refresh',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.error) {
            removeTokens();
            if (typeof window !== 'undefined') {
                window.location.href = '/signin';
            }
            return refreshResult;
        }

        const newAccessToken = refreshResult.meta?.response?.headers.get('Authentication-Access');
        if (newAccessToken) {
            saveAccessToken(newAccessToken);
            accessToken = newAccessToken;
        }
    }

    const isPublicEndpoint = (url: string) =>
        ['/auth/login', '/auth/signup', '/auth/check-auth'].some((endpoint) =>
            url.includes(endpoint),
        );

    const headers: Record<string, string> = {
        Accept: '*/*',
        ...(accessToken && !isPublicEndpoint(typeof args === 'string' ? args : args.url)
            ? { Authorization: `Bearer ${accessToken}` }
            : {}),
        ...(typeof args !== 'string' && args.body && !(args.body instanceof FormData)
            ? { 'Content-Type': 'application/json' }
            : {}),
        ...(typeof args !== 'string' && args.headers
            ? (args.headers as Record<string, string>)
            : {}),
    };

    const finalArgs: FetchArgs =
        typeof args === 'string' ? { url: args, headers } : { ...args, headers };

    const result = await rawBaseQuery(finalArgs, api, extraOptions);

    // Глобальный logout при 401/403
    if (result.error?.status === 401 || result.error?.status === 403) {
        api.dispatch({ type: 'auth/logout' });
        removeTokens();
        if (typeof window !== 'undefined') {
            window.location.href = '/signin';
        }
    }

    return result;
};
