import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { ApplicationState, store } from './configure-store';
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
