import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { setAppAlert, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (
        isRejectedWithValue(action) &&
        action.type !== 'auth/login/rejected' &&
        action.type !== 'auth/verifyOtp/rejected'
    ) {
        store.dispatch(
            setAppAlert({
                type: 'error',
                title: 'Ошибка сервера',
                message: 'Попробуйте поискать снова попозже',
            }),
        );
        store.dispatch(setAppLoader(false));
    }

    return next(action);
};
