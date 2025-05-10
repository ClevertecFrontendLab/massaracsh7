import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isLoading: true,
    error: '' as string | null,
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
    },
});

export const { setAppError, setAppLoader, clearAppError } = appSlice.actions;
export default appSlice.reducer;
