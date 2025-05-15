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
    ModalFooter,
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

const recoverySchema = z
    .object({
        login: z
            .string()
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),

        password: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Пароль должен быть не короче 8 символов')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),

        passwordConfirm: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Пароль должен быть не короче 8 символов')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли не совпадают',
        path: ['passwordConfirm'],
    });

type ResetFormType = z.infer<typeof recoverySchema>;

export const RecoveryModal = ({ isOpen, onClose }: RecoveryModalProps) => {
    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();

    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [generalError, setGeneralError] = useState<string>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const imageByStep: Record<typeof step, string | undefined> = {
        email: '/images/modal-breakfast.png',
        code: '/images/modal-breakfast.png',
        reset: '/images/modal-breakfast.png',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetFormType>({
        resolver: zodResolver(recoverySchema),
        mode: 'onChange',
    });

    const handleNext = async (data?: ResetFormType) => {
        setGeneralError(undefined);

        try {
            if (step === 'email') {
                await forgotPassword({ email }).unwrap();
                setStep('code');
            } else if (step === 'code') {
                await verifyOtp({ email, otpToken: code }).unwrap();
                setStep('reset');
            } else if (step === 'reset' && data) {
                await resetPassword({
                    login: data.login,
                    password: data.password,
                    passwordConfirm: data.passwordConfirm,
                }).unwrap();

                dispatch(
                    setAppAlert({
                        type: 'success',
                        title: 'Успешно',
                        message: 'Восстановление прошло успешно. Войдите в систему.',
                    }),
                );

                onClose();
                navigate('/login');
            }
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;

            if (fetchErr && 'status' in fetchErr) {
                const status = fetchErr.status;

                if (step === 'email' && status === 403) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Пользователь не найден',
                            message:
                                'Пользователь с таким email не найден. Попробуйте другой адрес.',
                        }),
                    );
                    setEmail('');
                }

                if (step === 'code' && status === 403) {
                    setGeneralError(
                        'Неверный код. Мы отправили на почту шестизначный код. Введите его.',
                    );
                    setCode('');
                }

                if (step === 'reset' && typeof status === 'number' && status >= 500) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Ошибка сервера',
                            message: 'Произошла ошибка. Повторите попытку позже.',
                        }),
                    );
                }
            } else {
                setGeneralError('Что-то пошло не так. Попробуйте снова.');
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent position='relative'>
                <CloseButton position='absolute' right='1rem' top='1rem' onClick={onClose} />
                {imageByStep[step] && (
                    <Box mt={4} mb={2}>
                        <Image src={imageByStep[step]} alt='Modal illustration' mx='auto' />
                    </Box>
                )}{' '}
                <ModalHeader>
                    {step === 'email' && 'Восстановление доступа'}
                    {step === 'code' && 'Введите код из письма'}
                    {step === 'reset' && 'Сброс пароля'}
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4} align='stretch'>
                        {generalError && <Text color='red.500'>{generalError}</Text>}

                        {step === 'email' && (
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='Ваш e-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        )}

                        {step === 'code' && (
                            <FormControl isInvalid={!!generalError}>
                                <FormLabel>Код</FormLabel>
                                <HStack justify='center'>
                                    <PinInput otp value={code} onChange={setCode}>
                                        {[...Array(6)].map((_, i) => (
                                            <PinInputField key={i} />
                                        ))}
                                    </PinInput>
                                </HStack>
                                <FormErrorMessage>{generalError}</FormErrorMessage>
                            </FormControl>
                        )}

                        {step === 'reset' && (
                            <form
                                onSubmit={handleSubmit(handleNext)}
                                style={{ width: '100%' }}
                                autoComplete='off'
                            >
                                <VStack spacing={4}>
                                    <FormControl isInvalid={!!errors.login}>
                                        <FormLabel>Логин</FormLabel>
                                        <Input {...register('login')} />
                                        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.password}>
                                        <FormLabel>Пароль</FormLabel>
                                        <Input type='password' {...register('password')} />
                                        <FormErrorMessage>
                                            {errors.password?.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.passwordConfirm}>
                                        <FormLabel>Повторите пароль</FormLabel>
                                        <Input type='password' {...register('passwordConfirm')} />
                                        <FormErrorMessage>
                                            {errors.passwordConfirm?.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Button type='submit' colorScheme='green' w='full'>
                                        Сохранить
                                    </Button>
                                </VStack>
                            </form>
                        )}
                    </VStack>
                </ModalBody>
                {step !== 'reset' && (
                    <ModalFooter justifyContent='space-between'>
                        <Button colorScheme='green' onClick={() => handleNext()}>
                            Далее
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
