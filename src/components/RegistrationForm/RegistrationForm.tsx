import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSignupMutation } from '~/query/services/auth';
import { SignUpRequest } from '~/types/authTypes';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .required('Введите имя')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: yup
        .string()
        .matches(/^[А-Яа-я-]+$/, 'Только кириллица А-Я, и "-"')
        .required('Введите фамилию')
        .max(50, 'Максимальная длина 50 символов'),
    email: yup
        .string()
        .email('Введите корректный e-mail')
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов'),
    login: yup
        .string()
        .matches(/^[A-Za-z0-9!@#$&_*+.-]+$/, 'Не соответствует формату')
        .required('Введите логин')
        .min(5, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: yup
        .string()
        .required('Введите пароль')
        .min(8, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Повторите пароль'),
});

type StatusMessage = 'error' | 'success' | 'info' | 'warning' | 'loading' | undefined;

export const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [statusMessage, setStatusMessage] = useState<{
        type: StatusMessage;
        message: string;
    } | null>(null);

    const [signup, { isLoading }] = useSignupMutation();

    const onSubmit = async (data: SignUpRequest) => {
        try {
            const result = await signup(data);
            if (result.data?.statusText) {
                setStatusMessage({
                    type: 'success',
                    message: 'Регистрация прошла успешно. Проверьте вашу почту для подтверждения.',
                });
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setStatusMessage({ type: 'error', message: 'Ошибка при регистрации' });
        }
    };

    return (
        <Box maxWidth='400px' mx='auto' mt='50px'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {statusMessage && (
                    <Alert status={statusMessage.type} mb={4}>
                        <AlertIcon />
                        <AlertTitle>
                            {statusMessage.type === 'error' ? 'Ошибка' : 'Успех'}
                        </AlertTitle>
                        <AlertDescription>{statusMessage.message}</AlertDescription>
                    </Alert>
                )}

                <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor='firstName'>Ваше имя</FormLabel>
                    <Input id='firstName' {...register('firstName')} />
                    <Alert status='error' mt={2} hidden={!errors.firstName}>
                        <AlertIcon />
                        <AlertTitle>{errors.firstName?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <FormControl isInvalid={!!errors.lastName} mt={4}>
                    <FormLabel htmlFor='lastName'>Ваша фамилия</FormLabel>
                    <Input id='lastName' {...register('lastName')} />
                    <Alert status='error' mt={2} hidden={!errors.lastName}>
                        <AlertIcon />
                        <AlertTitle>{errors.lastName?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <FormControl isInvalid={!!errors.email} mt={4}>
                    <FormLabel htmlFor='email'>Ваш email</FormLabel>
                    <Input id='email' type='email' {...register('email')} />
                    <Alert status='error' mt={2} hidden={!errors.email}>
                        <AlertIcon />
                        <AlertTitle>{errors.email?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <FormControl isInvalid={!!errors.login} mt={4}>
                    <FormLabel htmlFor='login'>Логин</FormLabel>
                    <Input id='login' {...register('login')} />
                    <Alert status='error' mt={2} hidden={!errors.login}>
                        <AlertIcon />
                        <AlertTitle>{errors.login?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mt={4}>
                    <FormLabel htmlFor='password'>Пароль</FormLabel>
                    <Input id='password' type='password' {...register('password')} />
                    <Alert status='error' mt={2} hidden={!errors.password}>
                        <AlertIcon />
                        <AlertTitle>{errors.password?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
                    <FormLabel htmlFor='confirmPassword'>Повторите пароль</FormLabel>
                    <Input id='confirmPassword' type='password' {...register('confirmPassword')} />
                    <Alert status='error' mt={2} hidden={!errors.confirmPassword}>
                        <AlertIcon />
                        <AlertTitle>{errors.confirmPassword?.message}</AlertTitle>
                    </Alert>
                </FormControl>

                <Button type='submit' mt={6} colorScheme='blue' width='full' isLoading={isLoading}>
                    Зарегистрироваться
                </Button>
            </form>
        </Box>
    );
};
