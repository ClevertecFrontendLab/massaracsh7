import {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { PUBLIC_ENDPOINTS } from '~/constants/constant-arrays';
import { API_BASE_URL } from '~/constants/constants';

import { getAccessToken, isTokenExpired, removeTokens, saveAccessToken } from './tokenUtils';

const looksLikeJwt = (token: string) => token.split('.').length === 3;

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

    if (accessToken && looksLikeJwt(accessToken) && isTokenExpired(accessToken)) {
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
                window.location.href = '/login';
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
        PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

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
    return result;
};
