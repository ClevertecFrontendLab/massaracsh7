import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertPayload, ModalPayload } from '~/types/utilTypes';

export interface AppState {
    isLoading: boolean;
    error: string | null;
    modal: ModalPayload | null;
    alert: AlertPayload | null;
    userId: string | null;
}

const initialState: AppState = {
    isLoading: true,
    error: null,
    modal: null,
    alert: null,
    userId: null,
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
        setUserId(state, { payload }: PayloadAction<string | null>) {
            state.userId = payload;
        },
    },
    selectors: {
        userLoadingSelector: (state) => state.isLoading,
        userErrorSelector: (state) => state.error,
        userAlertSelector: (state) => state.alert,
        userModalSelector: (state) => state.modal,
        userIdSelector: (state) => state.userId,
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
    setUserId,
} = appSlice.actions;

export const {
    userLoadingSelector,
    userErrorSelector,
    userAlertSelector,
    userModalSelector,
    userIdSelector,
} = appSlice.selectors;

export default appSlice.reducer;
