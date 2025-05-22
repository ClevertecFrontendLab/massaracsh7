import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import {
    ERROR_VERIFICATION_MESSAGE,
    ERROR_VERIFICATION_TITLE,
    SUCCESS_VERIFICATION_TITLE,
} from '~/constants/api-results';
import { FOOTER_MODAL_MESSAGE } from '~/constants/constants';
import { EMAIL_VERIFICATION_FAILED_MODAL } from '~/constants/test-ids';
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
                    title: SUCCESS_VERIFICATION_TITLE,
                }),
            );
        } else {
            navigate(ROUTES_PATH.SIGN_IN);
            dispatch(
                setAppModal({
                    title: ERROR_VERIFICATION_TITLE,
                    description: ERROR_VERIFICATION_MESSAGE,
                    imageSrc: '/images/modal-tea.png',
                    footerNote: FOOTER_MODAL_MESSAGE,
                    dataId: EMAIL_VERIFICATION_FAILED_MODAL,
                }),
            );
        }
    }, [emailVerified, dispatch, navigate]);

    return <></>;
};
