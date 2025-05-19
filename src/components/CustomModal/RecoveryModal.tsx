import {
    Box,
    Button,
    CloseButton,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Stack,
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
    const [titleError, setTitleError] = useState<string>();
    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const imageByStep: Record<typeof step, string | undefined> = {
        email: '/images/modal-breakfast.png',
        code: '/images/modal-parcel.png',
        reset: '',
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
        setStep('email');
        onClose();
    };

    const onSubmitEmail = async (data: EmailForm) => {
        setTitleError('');
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
                <Stack align='center' gap={8}>
                    {imageByStep[step] && (
                        <Box>
                            <Image
                                src={imageByStep[step]}
                                alt='Modal'
                                mx='auto'
                                boxSize={{ base: '108px', md: '206px' }}
                            />
                        </Box>
                    )}
                    <ModalHeader
                        fontSize={step === 'reset' ? '24px' : '16px'}
                        lineHeight={step === 'reset' ? '32px' : '24px'}
                        fontWeight={step === 'reset' ? '700' : 'normal'}
                    >
                        {!!titleError && (
                            <Heading
                                fontSize='24px'
                                lineHeight='32px'
                                fontWeight='700'
                                textAlign='center'
                                mb={2}
                            >
                                {titleError}
                            </Heading>
                        )}
                        {step === 'email' &&
                            'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код'}
                        {step === 'code' &&
                            `Мы отправили вам на e-mail ${emailValue} шестизначный код. Введите его ниже.`}
                        {step === 'reset' && 'Восстановление аккаунта'}
                    </ModalHeader>
                </Stack>
                <ModalBody>
                    <VStack spacing={4} align='stretch'>
                        {step === 'email' && (
                            <form onSubmit={submitEmail(onSubmitEmail)} style={{ width: '100%' }}>
                                <FormControl isInvalid={!!errEmail.email}>
                                    <FormLabel>Ваш email</FormLabel>
                                    <Input
                                        {...regEmail('email')}
                                        onBlur={() => {
                                            const trimmed = watch('email').trim();
                                            setValue('email', trimmed);
                                            trigger('email');
                                        }}
                                        data-test-id='email-input'
                                        placeholder='email'
                                        variant='sign'
                                    />
                                    <FormErrorMessage>{errEmail.email?.message}</FormErrorMessage>
                                </FormControl>
                                <Button
                                    mt={4}
                                    type='submit'
                                    variant='darkWhite'
                                    w='full'
                                    data-test-id='submit-button'
                                >
                                    Получить код
                                </Button>
                            </form>
                        )}

                        {step === 'code' && (
                            <form onSubmit={onSubmitCode}>
                                <FormControl isInvalid={!!titleError}>
                                    <HStack w='100%' mb={6} justifyContent='center'>
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
                                                    _placeholder={{ color: 'custimLime.800' }}
                                                    color='customLime.800'
                                                />
                                            ))}
                                        </PinInput>
                                    </HStack>
                                    <Button
                                        mt={4}
                                        type='submit'
                                        variant='darkWhite'
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
                                <VStack spacing={6}>
                                    <FormControl isInvalid={!!errReset.login}>
                                        <FormLabel>Введите логин</FormLabel>
                                        <Input
                                            {...regReset('login')}
                                            onBlur={() => {
                                                const trimmed = watchReset('login').trim();
                                                setResetValue('login', trimmed);
                                                triggerReset('login');
                                            }}
                                            variant='sign'
                                            data-test-id='login-input'
                                        />
                                        <FormHelperText mt={1}>
                                            Не менее 5 символов, только латиница
                                        </FormHelperText>
                                        <FormErrorMessage mt={1}>
                                            {errReset.login?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errReset.password}>
                                        <FormLabel>Пароль</FormLabel>
                                        <Input
                                            type='password'
                                            {...regReset('password')}
                                            data-test-id='password-input'
                                            variant='sign'
                                        />
                                        <FormHelperText mt={1}>
                                            Не менее 8 символов, с заглавной буквой и цифрой
                                        </FormHelperText>
                                        <FormErrorMessage mt={1}>
                                            {errReset.password?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!errReset.passwordConfirm}>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <Input
                                            type='password'
                                            {...regReset('passwordConfirm')}
                                            data-test-id='confirm-password-input'
                                            variant='sign'
                                        />
                                        <FormErrorMessage mt={1}>
                                            {errReset.passwordConfirm?.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Button
                                        mt={2}
                                        type='submit'
                                        variant='darkWhite'
                                        w='full'
                                        data-test-id='submit-button'
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </VStack>
                            </form>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>Не пришло письмо? Проверьте папку Спам.</ModalFooter>
            </ModalContent>
        </Modal>
    );
};
