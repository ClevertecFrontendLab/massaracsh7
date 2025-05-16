import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSignupMutation } from '~/query/services/auth';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { SignUpRequest } from '~/types/authTypes';

const schema = z
    .object({
        firstName: z
            .string()
            .nonempty('Введите имя')
            .regex(/^[А-ЯЁ][а-яё-]*$/, 'Должно начинаться с кириллицы А-Я')
            .regex(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        lastName: z
            .string()
            .nonempty('Введите фамилию')
            .regex(/^[А-ЯЁ][а-яё-]*$/, 'Должно начинаться с кириллицы А-Я')
            .regex(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
            .max(50, 'Максимальная длина 50 символов'),
        email: z
            .string()
            .nonempty('Введите e-mail')
            .email('Введите корректный e-mail')
            .max(50, 'Максимальная длина 50 символов'),
        login: z
            .string()
            .nonempty('Введите логин')
            .min(5, 'Минимум 5 символов')
            .max(50, 'Максимальная длина 50 символов')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
        password: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Пароль должен быть не короче 8 символов')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
        confirmPassword: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Пароль должен быть не короче 8 символов')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

type IForm = z.infer<typeof schema>;

export const RegistrationForm = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step1Data, setStep1Data] = useState<Pick<IForm, 'firstName' | 'lastName' | 'email'>>({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [step2Data, setStep2Data] = useState<
        Pick<IForm, 'login' | 'password' | 'confirmPassword'>
    >({
        login: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useAppDispatch();

    const [signup, { isLoading }] = useSignupMutation();
    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<IForm>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        shouldUnregister: false,
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
        },
    });

    const values = watch();
    const progress = useMemo(() => {
        const allFields: (keyof IForm)[] = [
            'firstName',
            'lastName',
            'email',
            'login',
            'password',
            'confirmPassword',
        ];

        const validCount = allFields.filter((field) => values[field]).length;
        return Math.round((validCount / allFields.length) * 100);
    }, [values]);

    const onNext = async () => {
        const ok = await trigger(['firstName', 'lastName', 'email']);
        if (!ok) return;

        const [firstName, lastName, email] = getValues(['firstName', 'lastName', 'email']);
        setStep1Data({ firstName, lastName, email });

        setValue('login', step2Data.login);
        setValue('password', step2Data.password);
        setValue('confirmPassword', step2Data.confirmPassword);

        setStep(2);
    };

    const onBack = () => {
        const [login, password, confirmPassword] = getValues([
            'login',
            'password',
            'confirmPassword',
        ]);
        setValue('firstName', step1Data.firstName);
        setValue('lastName', step1Data.lastName);
        setValue('email', step1Data.email);
        setStep2Data({ login, password, confirmPassword });
        setStep(1);
    };

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const { confirmPassword, ...payload } = data;

        try {
            const result = await signup(payload as SignUpRequest).unwrap();
            console.log(result);
            dispatch(
                setAppModal({
                    title: 'Остался последний шаг. Нужно верифицировать email',
                    description: `Мы отправили Вам на почту ${payload.email} ссылку для вериификации`,
                    imageSrc: '/images/modal-success.png',
                    footerNote:
                        'Не пришло письмо? Проверьте папаку Спам. По другим вопросам свяжитесь с поддержкой',
                    dataId: 'sign-up-success-modal',
                }),
            );
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                const message = (fetchErr.data as { message?: string })?.message;
                if (status === 400 && message) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: message,
                        }),
                    );
                } else if (String(status).startsWith('5')) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Ошибка сервера',
                            message: ' Попробуйте немного позже',
                        }),
                    );
                }
            }
        }
    };

    return (
        <Box maxW='400px' mx='auto' mt='50px'>
            <Progress
                mb={6}
                value={progress}
                size='sm'
                colorScheme='green'
                data-test-id='sign-up-progress'
            />

            <form
                autoComplete='off'
                onSubmit={
                    step === 1
                        ? (e) => {
                              e.preventDefault();
                              onNext();
                          }
                        : handleSubmit(onSubmit)
                }
                data-test-id='sign-up-form'
            >
                <VStack spacing={4}>
                    {step === 1 ? (
                        <>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                                <Input
                                    id='firstName'
                                    {...register('firstName')}
                                    onBlur={() => {
                                        const trimmed = watch('firstName').trim();
                                        setValue('firstName', trimmed);
                                        trigger('firstName');
                                    }}
                                    data-test-id='first-name-input'
                                />
                                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                                <Input
                                    id='lastName'
                                    {...register('lastName')}
                                    onBlur={() => {
                                        const trimmed = watch('lastName').trim();
                                        setValue('lastName', trimmed);
                                        trigger('lastName');
                                    }}
                                    data-test-id='last-name-input'
                                />
                                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                    id='email'
                                    type='email'
                                    {...register('email')}
                                    onBlur={() => {
                                        const trimmed = watch('email').trim();
                                        setValue('email', trimmed);
                                        trigger('email');
                                    }}
                                    data-test-id='email-input'
                                />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>

                            <Button
                                onClick={onNext}
                                colorScheme='green'
                                width='full'
                                data-test-id='submit-button'
                            >
                                Дальше
                            </Button>
                        </>
                    ) : (
                        <>
                            <FormControl isInvalid={!!errors.login}>
                                <FormLabel htmlFor='login'>Логин</FormLabel>
                                <Input
                                    id='login'
                                    {...register('login')}
                                    onBlur={() => {
                                        const trimmed = watch('login').trim();
                                        setValue('login', trimmed);
                                        trigger('login');
                                    }}
                                    data-test-id='login-input'
                                />
                                <FormHelperText>
                                    Не менее 5 символов, только латиница
                                </FormHelperText>
                                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor='password'>Пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        data-test-id='password-input'
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            size='sm'
                                            variant='ghost'
                                            aria-label={
                                                showPassword ? 'Скрыть пароль' : 'Показать пароль'
                                            }
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onMouseDown={() => setShowPassword(true)}
                                            onMouseUp={() => setShowPassword(false)}
                                            onMouseLeave={() => setShowPassword(false)}
                                            onTouchStart={() => setShowPassword(true)}
                                            onTouchEnd={() => setShowPassword(false)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText>
                                    Не менее 8 символов, с заглавной буквой и цифрой
                                </FormHelperText>
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.confirmPassword}>
                                <FormLabel htmlFor='confirmPassword'>Повторите пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        id='confirmPassword'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                        data-test-id='confirm-password-input'
                                    />
                                    <InputRightElement>
                                        <IconButton
                                            size='sm'
                                            variant='ghost'
                                            aria-label={
                                                showConfirmPassword
                                                    ? 'Скрыть пароль'
                                                    : 'Показать пароль'
                                            }
                                            icon={
                                                showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                                            }
                                            onMouseDown={() => setShowConfirmPassword(true)}
                                            onMouseUp={() => setShowConfirmPassword(false)}
                                            onMouseLeave={() => setShowConfirmPassword(false)}
                                            onTouchStart={() => setShowConfirmPassword(true)}
                                            onTouchEnd={() => setShowConfirmPassword(false)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.confirmPassword?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <HStack width='full' spacing={4}>
                                <Button onClick={onBack} flex={1}>
                                    Назад
                                </Button>
                                <Button
                                    type='submit'
                                    flex={1}
                                    colorScheme='blue'
                                    isLoading={isLoading}
                                    isDisabled={!isValid}
                                    data-test-id='submit-button'
                                >
                                    Зарегистрироваться
                                </Button>
                            </HStack>
                        </>
                    )}
                </VStack>
            </form>
        </Box>
    );
};
