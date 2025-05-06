import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { setAppError, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const message = 'Попробуйте поискать снова попозже';
        store.dispatch(setAppError(message));
        store.dispatch(setAppLoader(false));
    }
    return next(action);
};
