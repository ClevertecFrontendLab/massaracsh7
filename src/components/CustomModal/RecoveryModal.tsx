import {
    Box,
    Button,
    CloseButton,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOtpMutation,
} from '~/query/services/auth';
import { setAppAlert } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

type Step = 'email' | 'code' | 'reset';

interface RecoveryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const emailSchema = z.object({
    email: z
        .string()
        .nonempty('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .email('Введите корректный e-mail'),
});

const resetSchema = z
    .object({
        email: z.string(),
        login: z
            .string()
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
        password: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Не соответствует формату')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
        passwordConfirm: z.string().nonempty('Повторите пароль'),
    })
    .refine((d) => d.password === d.passwordConfirm, {
        message: 'Пароли должны совпадать',
        path: ['passwordConfirm'],
    });

type EmailForm = z.infer<typeof emailSchema>;
type ResetForm = z.infer<typeof resetSchema>;

export const RecoveryModal = ({ isOpen, onClose }: RecoveryModalProps) => {
    const [step, setStep] = useState<Step>('email');
    const [emailValue, setEmailValue] = useState('');
    const [code, setCode] = useState('');
    const [generalError, setGeneralError] = useState<string>();
    const [titleError, setTitleError] = useState<string>();
    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const imageByStep: Record<typeof step, string | undefined> = {
        email: '/images/modal-breakfast.png',
        code: '/images/modal-breakfast.png',
        reset: '/images/tea.png',
    };

    const {
        register: regEmail,
        handleSubmit: submitEmail,
        formState: { errors: errEmail },
        reset: resetEmailForm,
        trigger,
        setValue,
        watch,
    } = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        mode: 'onChange',
        defaultValues: { email: '' },
    });

    const {
        register: regReset,
        // handleSubmit: submitReset,
        getValues,
        setValue: setResetValue,
        formState: { errors: errReset },
        reset: resetResetForm,
        watch: watchReset,
        trigger: triggerReset,
    } = useForm<ResetForm>({
        resolver: zodResolver(resetSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            login: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const handleClose = () => {
        resetEmailForm();
        resetResetForm();
        setEmailValue('');
        setCode('');
        setGeneralError(undefined);
        setStep('email');
        onClose();
    };

    const onSubmitEmail = async (data: EmailForm) => {
        setGeneralError(undefined);
        try {
            await forgotPassword({ email: data.email }).unwrap();
            setEmailValue(data.email);
            setStep('code');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            setEmailValue('');
            resetEmailForm();
            if (e.status === 403) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Такого e-mail нет',
                        message:
                            'Попробуйте другой e-mail или проверьте правильность его написания',
                    }),
                );
            } else if (typeof e.status === 'number' && e.status >= 500) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка сервера',
                        message: 'Попробуйте немного позже',
                    }),
                );
            }
        }
    };

    const submitCode = async (value: string) => {
        setGeneralError(undefined);
        setTitleError('');
        try {
            await verifyOtp({ email: emailValue, otpToken: value }).unwrap();
            setResetValue('email', emailValue);
            setStep('reset');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            console.log(e);
            if (e.status === 403) {
                setTitleError('Неверный код.');
            } else if (typeof e.status === 'number' && e.status >= 500) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка сервера',
                        message: 'Попробуйте немного позже',
                    }),
                );
            }
            setCode('');
        }
    };

    const onSubmitCode = (e: React.FormEvent) => {
        e.preventDefault();
        submitCode(code);
    };

    // const onSubmitCode = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setGeneralError(undefined);
    //     setTitleError('');
    //     try {
    //         await verifyOtp({ email: emailValue, otpToken: code }).unwrap();
    //         setStep('reset');
    //     } catch (err) {
    //         const e = err as FetchBaseQueryError;
    //         console.log(e);
    //         if (e.status === 403) {
    //             setTitleError('Неверный код.');
    //         } else if (typeof e.status === 'number' && e.status >= 500) {
    //             dispatch(
    //                 setAppAlert({
    //                     type: 'error',
    //                     title: 'Ошибка сервера',
    //                     message: 'Попробуйте немного позже',
    //                 }),
    //             );
    //         }
    //         setCode('');
    //     }
    // };

    const onSubmitReset = async (data: ResetForm) => {
        try {
            await resetPassword({
                email: data.email,
                login: data.login,
                password: data.password,
                passwordConfirm: data.passwordConfirm,
            }).unwrap();
            dispatch(
                setAppAlert({
                    type: 'success',
                    title: 'Восстановление данных успешно',
                    message: '',
                }),
            );
            // handleClose();
            onClose();
            navigate('/login');
        } catch (err) {
            const e = err as FetchBaseQueryError;
            if (typeof e.status === 'number' && e.status >= 500) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка сервера',
                        message: 'Попробуйте немного позже',
                    }),
                );
            }
            // resetResetForm();
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
                    data-test-id='close-button'
                />
                {imageByStep[step] && (
                    <Box mt={4} mb={2}>
                        <Image src={imageByStep[step]} alt='Modal' mx='auto' />
                    </Box>
                )}
                <ModalHeader>
                    {titleError}
                    {step === 'email' &&
                        'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код'}
                    {step === 'code' &&
                        `Мы отправили вам на e-mail ${emailValue} шестизначный код. Введите его ниже.`}
                    {step === 'reset' && 'Восстановление аккаунта'}
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4} align='stretch'>
                        {generalError && <Text color='red.500'>{generalError}</Text>}

                        {step === 'email' && (
                            <form onSubmit={submitEmail(onSubmitEmail)} style={{ width: '100%' }}>
                                <FormControl isInvalid={!!errEmail.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        {...regEmail('email')}
                                        onBlur={() => {
                                            const trimmed = watch('email').trim();
                                            setValue('email', trimmed);
                                            trigger('email');
                                        }}
                                        data-test-id='email-input'
                                    />
                                    <FormErrorMessage>{errEmail.email?.message}</FormErrorMessage>
                                </FormControl>
                                <Button
                                    mt={4}
                                    type='submit'
                                    colorScheme='green'
                                    w='full'
                                    data-test-id='submit-button'
                                >
                                    Получить код
                                </Button>
                            </form>
                        )}

                        {step === 'code' && (
                            <form onSubmit={onSubmitCode}>
                                <FormControl isInvalid={!!generalError}>
                                    <FormLabel>Код</FormLabel>
                                    <HStack>
                                        <PinInput
                                            otp
                                            value={code}
                                            onChange={setCode}
                                            onComplete={(value) => {
                                                setCode(value);
                                                submitCode(value);
                                            }}
                                        >
                                            {[...Array(6)].map((_, i) => (
                                                <PinInputField
                                                    key={i}
                                                    data-test-id={`verification-code-input-${i + 1}`}
                                                    borderColor={titleError ? 'red.500' : undefined}
                                                />
                                            ))}
                                        </PinInput>
                                    </HStack>
                                    <Button
                                        mt={4}
                                        type='submit'
                                        colorScheme='green'
                                        w='full'
                                        data-test-id='submit-code'
                                    >
                                        Подтвердить
                                    </Button>
                                </FormControl>
                            </form>
                        )}

                        {step === 'reset' && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const values = getValues();
                                    onSubmitReset(values);
                                }}
                                style={{ width: '100%' }}
                            >
                                <FormControl isInvalid={!!errReset.login}>
                                    <FormLabel>Введите логин</FormLabel>
                                    <Input
                                        {...regReset('login')}
                                        onBlur={() => {
                                            const trimmed = watchReset('login').trim();
                                            setResetValue('login', trimmed);
                                            triggerReset('login');
                                        }}
                                        data-test-id='login-input'
                                    />
                                    <FormErrorMessage>{errReset.login?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errReset.password}>
                                    <FormLabel>Пароль</FormLabel>
                                    <Input
                                        type='password'
                                        {...regReset('password')}
                                        data-test-id='password-input'
                                    />
                                    <FormErrorMessage>
                                        {errReset.password?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errReset.passwordConfirm}>
                                    <FormLabel>Повторите пароль</FormLabel>
                                    <Input
                                        type='password'
                                        {...regReset('passwordConfirm')}
                                        data-test-id='confirm-password-input'
                                    />
                                    <FormErrorMessage>
                                        {errReset.passwordConfirm?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button
                                    mt={4}
                                    type='submit'
                                    colorScheme='green'
                                    w='full'
                                    data-test-id='submit-button'
                                >
                                    Сохранить
                                </Button>
                            </form>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
