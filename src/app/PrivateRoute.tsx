import { JSX } from 'react';
import { Navigate } from 'react-router';

import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { getAccessToken } from '~/utils/tokenUtils';

import { ROUTES_PATH } from './routes';

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const accessToken = getAccessToken();
    const dispatch = useAppDispatch();

    if (!accessToken) {
        dispatch(setAppLoader(false));
        return <Navigate to={ROUTES_PATH.LOG_IN} replace />;
    }

    return children;
};
