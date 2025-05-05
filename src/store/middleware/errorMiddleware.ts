import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { setAppError, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const error = action.payload as FetchBaseQueryError;
        const status = error?.status;
        if (status !== 404) {
            const message = 'Попробуйте поискать снова попозже.';
            store.dispatch(setAppError(message));
        }

        store.dispatch(setAppLoader(false));
    }

    return next(action);
};
