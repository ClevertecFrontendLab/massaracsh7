import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const emailVerified = searchParams.get('emailVerified');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (emailVerified === 'true') {
            console.log('You are OK!');
            navigate(ROUTES_PATH.LOG_IN);
            dispatch(
                setAppAlert({
                    type: 'success',
                    title: 'Верификация прошла успешно',
                }),
            );
        } else {
            navigate(ROUTES_PATH.SIGN_IN);
            dispatch(
                setAppModal({
                    title: 'Упс. Что-то пошло не так',
                    description: `Ваша ссылка верификации не действительна. Попробуйте зарегистрироваться снова`,
                    imageSrc: '/images/modal-tea.png',
                    footerNote: 'Остались вопросы? Свяжитесь с поддержкой',
                    dataId: 'email-verification-failed-modal',
                }),
            );
        }
    }, [emailVerified, dispatch, navigate]);

    return (
        <>
            <p>Error registration</p>
        </>
    );
};
