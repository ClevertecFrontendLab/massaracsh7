import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { API_RESULTS } from '~/constants/api-results';
import { setAppAlert } from '~/store/app-slice';
import { AppDispatch } from '~/store/hooks';

import { isServerError } from './isServerError';

export type HandleRecipeCreateProps = {
    err: unknown;
    dispatch: AppDispatch;
    isDraft?: boolean;
};

export const handleRecipeCreateError = ({
    err,
    dispatch,
    isDraft = false,
}: HandleRecipeCreateProps) => {
    if (typeof err === 'object' && err !== null && 'status' in err) {
        const fetchErr = err as FetchBaseQueryError;

        if (fetchErr.status === 409) {
            dispatch(
                setAppAlert({
                    type: 'error',
                    title: API_RESULTS.ERROR_TITLE,
                    sourse: 'global',
                    message: API_RESULTS.ERROR_RECIPE_DUBLE,
                }),
            );
            return;
        }

        if (isServerError(fetchErr)) {
            dispatch(
                setAppAlert({
                    type: 'error',
                    title: API_RESULTS.ERROR_SERVER_TITLE,
                    sourse: 'global',
                    message: isDraft
                        ? API_RESULTS.ERROR_DRAFT_SERVER
                        : API_RESULTS.ERROR_RECIPE_SERVER,
                }),
            );
        }
    } else {
        console.error('Unexpected error:', err);
    }
};
