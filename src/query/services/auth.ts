import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { LoginRequest, LoginResponse } from '~/types/authTypes';
import { saveAccessToken } from '~/utils/tokenUtils';

import { ApiEndpoints } from '../constants/api';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { catalogApiSlice } from '../create-api';

interface SignUpRequest {
    email: string;
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

interface SignUpResponse {
    statusText: string;
    message: string;
}

export const authApiSlice = catalogApiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            signup: builder.mutation<SignUpResponse, SignUpRequest>({
                query: (body) => ({
                    url: ApiEndpoints.SIGN_UP,
                    method: 'POST',
                    body,
                    name: EndpointNames.SIGN_UP,
                }),
                invalidatesTags: [Tags.AUTH],
            }),
            login: builder.mutation<LoginResponse, LoginRequest>({
                query: (body) => ({
                    url: ApiEndpoints.LOGIN,
                    method: 'POST',
                    body,
                    name: EndpointNames.LOGIN,
                }),
                async onQueryStarted(_, { queryFulfilled }) {
                    queryFulfilled
                        .then(({ meta }) => {
                            const response = (meta as FetchBaseQueryMeta)?.response;
                            const accessToken = response?.headers.get('Authentication-Access');
                            if (accessToken) {
                                saveAccessToken(accessToken);
                            }
                        })
                        .catch((err) => {
                            console.error('Login error:', err);
                        });
                },

                invalidatesTags: [Tags.AUTH],
            }),
        }),
    });

export const { useSignupMutation, useLoginMutation } = authApiSlice;
