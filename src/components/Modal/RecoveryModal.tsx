import {
    CloseButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    ERROR_EMAILRESET_MESSAGE,
    ERROR_EMAILRESET_TITLE,
    ERROR_SERVER_MESSAGE,
    ERROR_SERVER_TITLE,
} from '~/constants/api-results';
import { FOOTER_RECOVERY_MESSAGE } from '~/constants/constants';
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
} from '~/query/services/auth';
import { setAppAlert } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

import { CodeStepForm } from './CodeStepForm';
import { EmailStepForm } from './EmailStepForm';
import { ModalHeaderContent } from './ModalHeaderContent';
import { EmailFormData, emailSchema, ResetFormData, resetSchema } from './recoverySchema';
import { ResetStepForm } from './ResetStepForm';

type Step = 'email' | 'code' | 'reset';

export const RecoveryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState<Step>('email');
    const [emailValue, setEmailValue] = useState('');
    const [code, setCode] = useState('');
    const [titleError, setTitleError] = useState<string>();

    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register: regEmail,
        formState: { errors: errEmail },
        reset: resetEmailForm,
        trigger,
        setValue,
        watch,
    } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
        defaultValues: { email: '' },
    });

    const {
        register: regReset,
        formState: { errors: errReset },
        reset: resetResetForm,
        watch: watchReset,
        getValues,
        setValue: setResetValue,
        trigger: triggerReset,
    } = useForm<ResetFormData>({
        resolver: zodResolver(resetSchema),
        mode: 'onChange',
        defaultValues: { email: '', login: '', password: '', passwordConfirm: '' },
    });

    const handleClose = () => {
        resetEmailForm();
        resetResetForm();
        setEmailValue('');
        setCode('');
        setStep('email');
        onClose();
    };

    const onSubmitEmail = async (data: EmailFormData) => {
        setTitleError('');
        try {
            await forgotPassword({ email: data.email }).unwrap();
            setEmailValue(data.email);
            setStep('code');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            resetEmailForm();
            if (e.status === 403) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: ERROR_EMAILRESET_TITLE,
                        message: ERROR_EMAILRESET_MESSAGE,
                    }),
                );
            } else if (e.status && String(e.status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: ERROR_SERVER_TITLE,
                        message: ERROR_SERVER_MESSAGE,
                    }),
                );
            }
        }
    };

    const submitCode = async (value: string) => {
        setTitleError('');
        try {
            await verifyOtp({ email: emailValue, otpToken: value }).unwrap();
            setResetValue('email', emailValue);
            setStep('reset');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            if (e.status === 403) {
                setTitleError('Неверный код.');
            } else if (e.status && String(e.status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: ERROR_SERVER_TITLE,
                        message: ERROR_SERVER_MESSAGE,
                    }),
                );
            }
            setCode('');
        }
    };

    const onSubmitReset = async (data: ResetFormData) => {
        try {
            await resetPassword({ ...data }).unwrap();
            dispatch(
                setAppAlert({
                    type: 'success',
                    title: 'Восстановление данных успешно',
                    message: '',
                }),
            );
            handleClose();
            navigate('/login');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            if (e.status && String(e.status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: ERROR_SERVER_TITLE,
                        message: ERROR_SERVER_MESSAGE,
                    }),
                );
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent
                data-test-id={
                    step === 'email'
                        ? 'send-email-modal'
                        : step === 'code'
                          ? 'verification-code-modal'
                          : 'reset-credentials-modal'
                }
            >
                <CloseButton
                    position='absolute'
                    right='1rem'
                    top='1rem'
                    onClick={handleClose}
                    border='1px solid black'
                    borderRadius='50%'
                    data-test-id='close-button'
                    w={6}
                    h={6}
                />

                <ModalHeaderContent step={step} emailValue={emailValue} titleError={titleError} />

                <ModalBody>
                    <Stack align='stretch' spacing={4}>
                        {step === 'email' && (
                            <EmailStepForm
                                register={regEmail}
                                errors={errEmail}
                                watch={watch}
                                setValue={setValue}
                                trigger={trigger}
                                onSubmitEmail={onSubmitEmail}
                            />
                        )}
                        {step === 'code' && (
                            <CodeStepForm
                                code={code}
                                setCode={setCode}
                                titleError={titleError}
                                submitCode={submitCode}
                            />
                        )}
                        {step === 'reset' && (
                            <ResetStepForm
                                register={regReset}
                                errors={errReset}
                                watch={watchReset}
                                getValues={getValues}
                                setValue={setResetValue}
                                trigger={triggerReset}
                                onSubmitReset={onSubmitReset}
                            />
                        )}
                    </Stack>
                </ModalBody>

                <ModalFooter>{FOOTER_RECOVERY_MESSAGE}</ModalFooter>
            </ModalContent>
        </Modal>
    );
};
