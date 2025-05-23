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

import { ROUTES_PATH } from '~/app/routes';
import { API_RESULTS } from '~/constants/api-results';
import { FOOTER_RECOVERY_MESSAGE } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
} from '~/query/services/auth';
import { setAppAlert } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { isServerError } from '~/utils/isServerError';

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
    const isEmailStep = step === 'email';
    const isCodeStep = step === 'code';
    const isResetStep = step === 'reset';

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
        setTitleError('');
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
                        title: API_RESULTS.ERROR_EMAILRESET_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_EMAILRESET_MESSAGE,
                    }),
                );
            } else if (e.status && String(e.status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_SERVER_MESSAGE,
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
            } else if (isServerError(e)) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_SERVER_MESSAGE,
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
                    sourse: 'global',
                    message: '',
                }),
            );
            handleClose();
            navigate(ROUTES_PATH.LOG_IN);
        } catch (err) {
            const e = err as FetchBaseQueryError;
            if (isServerError(e)) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_SERVER_MESSAGE,
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
                    isEmailStep
                        ? TEST_IDS.SEND_EMAIL_MODAL
                        : isCodeStep
                          ? TEST_IDS.VERIFICATION_CODE_MODAL
                          : TEST_IDS.RESET_CREDENTIALS_MODAL
                }
            >
                <CloseButton
                    position='absolute'
                    right='1rem'
                    top='1rem'
                    onClick={handleClose}
                    border='1px solid black'
                    borderRadius='50%'
                    data-test-id={TEST_IDS.CLOSE_BUTTON}
                    w={6}
                    h={6}
                />
                <ModalHeaderContent step={step} emailValue={emailValue} titleError={titleError} />
                <ModalBody mb={0} pb={0}>
                    <Stack align='stretch' spacing={4}>
                        {isEmailStep && (
                            <EmailStepForm
                                register={regEmail}
                                errors={errEmail}
                                watch={watch}
                                setValue={setValue}
                                trigger={trigger}
                                onSubmitEmail={onSubmitEmail}
                            />
                        )}
                        {isCodeStep && (
                            <CodeStepForm
                                code={code}
                                setCode={setCode}
                                titleError={titleError}
                                submitCode={submitCode}
                            />
                        )}
                        {isResetStep && (
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
                {(isEmailStep || isCodeStep) && (
                    <ModalFooter p={0} px={{ sm: 16, md: 16, lg: 0, xl: 0 }} mt={6}>
                        {FOOTER_RECOVERY_MESSAGE}
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
