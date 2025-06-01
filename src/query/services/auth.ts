import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { jwtDecode } from 'jwt-decode';

import { setUserId } from '~/store/app-slice';
import {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
} from '~/types/authTypes';

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

interface DecodedToken {
    userId: string;
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
                onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                    try {
                        const { meta } = await queryFulfilled;
                        const accessToken = (meta as FetchBaseQueryMeta)?.response?.headers.get(
                            'Authentication-Access',
                        );

                        if (accessToken) {
                            localStorage.setItem('accessToken', accessToken);
                            const decoded = jwtDecode<DecodedToken>(accessToken);
                            dispatch(setUserId(decoded.userId));
                            localStorage.setItem('userId', decoded.userId);
                        }

                        if (typeof window !== 'undefined') {
                            setTimeout(() => {
                                window.location.href = import.meta.env.BASE_URL;
                            }, 0);
                        }
                    } catch (err) {
                        console.error('Login error:', err);
                    }
                },

                invalidatesTags: [Tags.AUTH],
            }),
            forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
                query: (body) => ({
                    url: ApiEndpoints.FORGOT_PASSWORD,
                    method: 'POST',
                    body,
                    name: EndpointNames.FORGOT_PASSWORD,
                }),
            }),
            verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
                query: (body) => ({
                    url: ApiEndpoints.VERIFY_OTP,
                    method: 'POST',
                    body,
                    name: EndpointNames.VERIFY_OTP,
                }),
            }),
            resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
                query: (body) => ({
                    url: ApiEndpoints.RESET_PASSWORD,
                    method: 'POST',
                    body,
                    name: EndpointNames.RESET_PASSWORD,
                }),
            }),
        }),
    });

export const {
    useSignupMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApiSlice;
