import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified');
    const navigate = useNavigate();

    useEffect(() => {
        if (emailVerified === 'true') {
            console.log('You are OK!');
            navigate(ROUTES_PATH.LOG_IN);
        } else {
            navigate(ROUTES_PATH.SIGN_IN);
        }
    }, [emailVerified, navigate]);

    return (
        <>
            <p>Error registration</p>
        </>
    );
};
