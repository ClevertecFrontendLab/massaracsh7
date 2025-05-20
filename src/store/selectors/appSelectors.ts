import { ApplicationState } from '~/store/configure-store';

export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const userAlertSelector = (state: ApplicationState) => state.app.alert;
export const userModalSelector = (state: ApplicationState) => state.app.modal;
