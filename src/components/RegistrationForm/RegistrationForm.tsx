import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Progress,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSignupMutation } from '~/query/services/auth';
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
            .min(8, 'Минимум 8 символов')
            .max(50, 'Максимальная длина 50 символов')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
        confirmPassword: z
            .string()
            .nonempty('Повторите пароль')
            .min(8, 'Минимум 8 символов')
            .max(50, 'Максимальная длина 50 символов'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

type IForm = z.infer<typeof schema>;

export const RegistrationForm = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [step1Data, setStep1Data] = useState<Pick<IForm, 'firstName' | 'lastName' | 'email'>>({
        firstName: '',
        lastName: '',
        email: '',
    });

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
        shouldUnregister: true,
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
        const keys: (keyof IForm)[] = [
            'firstName',
            'lastName',
            'email',
            'login',
            'password',
            'confirmPassword',
        ];
        const validCount = keys.filter((k) => values[k] && !errors[k]).length;
        return Math.round((validCount / keys.length) * 100);
    }, [values, errors]);

    const onNext = async () => {
        const ok = await trigger(['firstName', 'lastName', 'email']);
        if (!ok) return;

        const [firstName, lastName, email] = getValues(['firstName', 'lastName', 'email']);
        setStep1Data({ firstName, lastName, email });

        setValue('login', '');
        setValue('password', '');
        setValue('confirmPassword', '');

        setStep(2);
    };

    const onBack = () => {
        setValue('firstName', step1Data.firstName);
        setValue('lastName', step1Data.lastName);
        setValue('email', step1Data.email);

        setStep(1);
    };

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const { confirmPassword, ...payload } = data;

        try {
            await signup(payload as SignUpRequest).unwrap();
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                let message = 'Ошибка';
                const data = fetchErr.data;

                if (
                    data &&
                    typeof data === 'object' &&
                    'message' in data &&
                    typeof (data as { message: unknown }).message === 'string'
                ) {
                    message = (data as { message: string }).message;
                }

                console.error('Ошибка запроса:', message);
            } else {
                const serializedErr = err as SerializedError;
                console.error('Системная ошибка:', serializedErr.message ?? 'Неизвестная ошибка');
            }
        }
    };

    return (
        <Box maxW='400px' mx='auto' mt='50px'>
            <Progress mb={6} value={progress} size='sm' colorScheme='blue' />

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
            >
                <VStack spacing={4}>
                    {step === 1 ? (
                        <>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                                <Input id='firstName' {...register('firstName')} />
                                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                                <Input id='lastName' {...register('lastName')} />
                                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input id='email' type='email' {...register('email')} />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>

                            <Button onClick={onNext} colorScheme='green' width='full'>
                                Далее
                            </Button>
                        </>
                    ) : (
                        <>
                            <FormControl isInvalid={!!errors.login}>
                                <FormLabel htmlFor='login'>Логин</FormLabel>
                                <Input id='login' {...register('login')} />
                                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel htmlFor='password'>Пароль</FormLabel>
                                <Input id='password' type='password' {...register('password')} />
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.confirmPassword}>
                                <FormLabel htmlFor='confirmPassword'>Повторите пароль</FormLabel>
                                <Input
                                    id='confirmPassword'
                                    type='password'
                                    {...register('confirmPassword')}
                                />
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
