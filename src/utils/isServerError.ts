import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isServerError = (e: FetchBaseQueryError) =>
    e.status && String(e.status).startsWith('5');
