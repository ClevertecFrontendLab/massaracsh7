import { Button } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { LoginForm } from '~/components/LoginForm/LoginForm';
import { AuthLayout } from '~/layout/AuthLayout';
import { useForgotPasswordMutation } from '~/query/services/auth';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const [forgotPassword] = useForgotPasswordMutation();

    const handleForgot = () => {
        dispatch(
            setAppModal({
                withInput: true,
                title: 'Восстановление доступа',
                description:
                    'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код',
                imageSrc: '/images/modal-breakfast.png',
                primaryActionText: 'Получить код',
                footerNote: 'Не пришло письмо? Проверьте папку Спам',
                onPrimaryAction: async (email?: string, resetInput?: () => void) => {
                    if (!email) return;

                    try {
                        await forgotPassword({ email }).unwrap();
                        dispatch(
                            setAppAlert({
                                type: 'success',
                                title: 'Письмо отправлено',
                                message: 'Проверьте вашу почту и следуйте инструкции',
                            }),
                        );
                    } catch (err) {
                        if (typeof err === 'object' && err !== null && 'status' in err) {
                            const fetchErr = err as FetchBaseQueryError;
                            const status = fetchErr.status;
                            if (status === 403) {
                                dispatch(
                                    setAppAlert({
                                        type: 'error',
                                        title: 'Такого e-mail нет',
                                        message:
                                            'Попробуйте другой e-mail или проверьте правильность его написания',
                                    }),
                                );
                                resetInput?.();
                            }
                        }
                    }
                },
            }),
        );
    };

    return (
        <AuthLayout activeTab='login'>
            <LoginForm />
            <Button variant='ghost' onClick={handleForgot}>
                Забыли логин или пароль
            </Button>
        </AuthLayout>
    );
};
