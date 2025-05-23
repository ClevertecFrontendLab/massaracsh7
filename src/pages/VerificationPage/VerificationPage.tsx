import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { API_RESULTS } from '~/constants/api-results';
import { FOOTER_MODAL_MESSAGE } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (emailVerified === 'true') {
            navigate(ROUTES_PATH.LOG_IN);
            dispatch(
                setAppAlert({
                    type: 'success',
                    sourse: 'auth',
                    title: API_RESULTS.SUCCESS_VERIFICATION_TITLE,
                }),
            );
        } else {
            navigate(ROUTES_PATH.SIGN_IN);
            dispatch(
                setAppModal({
                    title: API_RESULTS.ERROR_VERIFICATION_TITLE,
                    description: API_RESULTS.ERROR_VERIFICATION_MESSAGE,
                    imageSrc: '/images/modal-tea.png',
                    footerNote: FOOTER_MODAL_MESSAGE,
                    dataId: TEST_IDS.EMAIL_VERIFICATION_FAILED_MODAL,
                }),
            );
        }
    }, [emailVerified, dispatch, navigate]);

    return <></>;
};
