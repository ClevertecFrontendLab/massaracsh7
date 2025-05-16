import { JSX } from 'react';
import { Navigate } from 'react-router';

import { getAccessToken } from '~/utils/tokenUtils';

import { ROUTES_PATH } from './routes';

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        return <Navigate to={ROUTES_PATH.LOG_IN} replace />;
    }

    return children;
};
