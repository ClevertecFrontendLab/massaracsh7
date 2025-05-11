import { JSX } from 'react';
import { Navigate } from 'react-router';

import { getAccessToken, isTokenExpired } from '~/utils/tokenUtils';

import { ROUTES_PATH } from './routes';

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const accessToken = getAccessToken();

    if (!accessToken || isTokenExpired(accessToken)) {
        return <Navigate to={ROUTES_PATH.SIGN_IN} replace />;
    }

    return children;
};
