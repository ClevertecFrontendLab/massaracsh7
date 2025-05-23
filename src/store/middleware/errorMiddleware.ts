import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { setAppAlert, setAppLoader } from '../app-slice';
import { store } from '../configure-store';

const ignoredEndpointNames = ['login', 'forgotPassword', 'verifyOtp', 'resetPassword'];

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const state = store.getState();
        const endpointName = (action as { meta?: { arg?: { endpointName?: string } } })?.meta?.arg
            ?.endpointName;

        const alertIsAlreadyShown = !!state.app.alert;

        if (endpointName && !ignoredEndpointNames.includes(endpointName) && !alertIsAlreadyShown) {
            store.dispatch(
                setAppAlert({
                    type: 'error',
                    title: 'Ошибка сервера',
                    sourse: 'global',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
            store.dispatch(setAppLoader(false));
        }
    }

    return next(action);
};
