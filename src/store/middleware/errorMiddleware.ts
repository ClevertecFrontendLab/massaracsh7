import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { ERROR_APP_MESSAGE } from '~/constants/constants';

import { setAppError, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        store.dispatch(setAppError(ERROR_APP_MESSAGE));
        store.dispatch(setAppLoader(false));
    }
    return next(action);
};
