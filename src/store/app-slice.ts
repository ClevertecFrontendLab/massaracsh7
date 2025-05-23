import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertPayload, ModalPayload } from '~/types/utilTypes';

export interface AppState {
    isLoading: boolean;
    error: string | null;
    modal: ModalPayload | null;
    alert: AlertPayload | null;
}

const initialState: AppState = {
    isLoading: true,
    error: null,
    modal: null,
    alert: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        clearAppError(state) {
            state.error = null;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setAppModal(state, { payload }: PayloadAction<ModalPayload>) {
            state.modal = payload;
        },
        clearModal(state) {
            state.modal = null;
        },
        setAppAlert(state, { payload }: PayloadAction<AlertPayload>) {
            state.alert = payload;
        },
        clearAppAlert(state) {
            state.alert = null;
        },
    },
    selectors: {
        userLoadingSelector: (state) => state.isLoading,
        userErrorSelector: (state) => state.error,
        userAlertSelector: (state) => state.alert,
        userModalSelector: (state) => state.modal,
    },
});

export const {
    setAppError,
    setAppLoader,
    clearAppError,
    setAppModal,
    clearModal,
    setAppAlert,
    clearAppAlert,
} = appSlice.actions;
export const { userLoadingSelector, userErrorSelector, userAlertSelector, userModalSelector } =
    appSlice.selectors;
export default appSlice.reducer;
