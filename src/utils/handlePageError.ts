import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { API_RESULTS } from '~/constants/api-results';
import { setAppAlert } from '~/store/app-slice';
import { AppDispatch } from '~/store/hooks';

import { isServerError } from './isServerError';

export type HandlePageProps = {
    err: unknown;
    title?: string;
    message?: string;
    dispatch: AppDispatch;
    sourse?: 'global' | 'auth';
    page?: 'blog' | 'recipe' | 'createRecipe';
    isDraft?: boolean;
};

export const handlePageError = ({
    err,
    title = 'Ошибка сервера',
    message = 'Попробуйте немного позже.',
    sourse = 'global',
    dispatch,
    page = 'blog',
    isDraft = false,
}: HandlePageProps) => {
    if (typeof err !== 'object' || err === null || !('status' in err)) {
        console.error('Unexpected error:', err);
        return;
    }

    const fetchErr = err as FetchBaseQueryError;

    switch (page) {
        case 'blog':
            dispatch(setAppAlert({ type: 'error', title, message, sourse }));
            break;

        case 'recipe':
            if (isServerError(fetchErr)) {
                dispatch(setAppAlert({ type: 'error', title, message, sourse }));
            }
            break;

        case 'createRecipe':
            if (fetchErr.status === 409) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_TITLE,
                        message: API_RESULTS.ERROR_RECIPE_DUBLE,
                        sourse: 'global',
                    }),
                );
            } else if (isServerError(fetchErr)) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        message: isDraft
                            ? API_RESULTS.ERROR_DRAFT_SERVER
                            : API_RESULTS.ERROR_RECIPE_SERVER,
                        sourse: 'global',
                    }),
                );
            } else {
                console.error(`Unhandled status ${fetchErr.status}`, err);
            }
            break;
    }
};
