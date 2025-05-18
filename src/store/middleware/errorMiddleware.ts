import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { setAppAlert, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

const ignoredEndpointNames = ['login', 'forgotPassword', 'verifyOtp', 'resetPassword'];

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const endpointName = (action as { meta?: { arg?: { endpointName?: string } } })?.meta?.arg
            ?.endpointName;

        if (endpointName && !ignoredEndpointNames.includes(endpointName)) {
            store.dispatch(
                setAppAlert({
                    type: 'error',
                    title: 'Ошибка сервера',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
            store.dispatch(setAppLoader(false));
        }
    }

    return next(action);
};
