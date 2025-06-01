import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { setAppAlert } from '~/store/app-slice';
import { AppDispatch } from '~/store/hooks';

import { isServerError } from './isServerError';

export type HandleRecipePageProps = {
    err: unknown;
    title?: string;
    message?: string;
    dispatch: AppDispatch;
    sourse?: 'global' | 'auth';
};

export const handleRecipePageError = ({
    err,
    title = 'Ошибка сервера',
    message = 'Попробуйте немного позже',
    sourse = 'global',
    dispatch,
}: HandleRecipePageProps) => {
    if (typeof err === 'object' && err !== null && 'status' in err) {
        const fetchErr = err as FetchBaseQueryError;
        if (isServerError(fetchErr)) {
            dispatch(
                setAppAlert({
                    type: 'error',
                    title,
                    message,
                    sourse,
                }),
            );
        }
    } else {
        console.error('Unexpected error:', err);
    }
};
