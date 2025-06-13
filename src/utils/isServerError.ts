import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isServerError = (e: FetchBaseQueryError) =>
    e.status && String(e.status).startsWith('5');

export const is404Error = (error: unknown) =>
    error && typeof error === 'object' && 'status' in error && error.status === 404;
