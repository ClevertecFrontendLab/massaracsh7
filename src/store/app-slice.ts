import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalPayload } from '~/types/utilTypes';

export type AppState = typeof initialState;

const initialState = {
    isLoading: true,
    error: '' as string | null,
    modal: null as ModalPayload | null,
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
    },
});

export const { setAppError, setAppLoader, clearAppError, setAppModal, clearModal } =
    appSlice.actions;
export default appSlice.reducer;
