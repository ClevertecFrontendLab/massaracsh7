import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    ERROR_EMAIL_MESSAGE,
    ERROR_EMAIL_TITLE,
    ERROR_LOGIN_MESSAGE,
    ERROR_LOGIN_MESSAGE_500,
    ERROR_LOGIN_TITLE,
    ERROR_LOGIN_TITLE_500,
} from '~/constants/api-results';
import { LOGIN_INPUT, PASSWORD_INPUT } from '~/constants/test-ids';
import { useLoginMutation } from '~/query/services/auth';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { LoginRequest } from '~/types/authTypes';

import { LoginFormData, loginSchema } from './loginSchema';

export const LoginForm = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        shouldUnregister: true,
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data as LoginRequest).unwrap();
            navigate('/');
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                if (status === 401) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: ERROR_LOGIN_TITLE,
                            message: ERROR_LOGIN_MESSAGE,
                        }),
                    );
                } else if (status === 403) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: ERROR_EMAIL_TITLE,
                            message: ERROR_EMAIL_MESSAGE,
                        }),
                    );
                } else if (String(status).startsWith('5')) {
                    dispatch(
                        setAppModal({
                            title: ERROR_LOGIN_TITLE_500,
                            description: ERROR_LOGIN_MESSAGE_500,
                            imageSrc: '/images/modal-breakfast.png',
                            dataId: 'sign-in-error-modal',
                            onPrimaryAction: async () => {
                                try {
                                    await login(data as LoginRequest).unwrap();
                                } catch {
                                    console.log('Вход не выполнен');
                                }
                            },
                        }),
                    );
                }
            }
        }
    };

    return (
        <Box maxW='400px' mx='auto' mt='50px'>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} data-test-id='sign-in-form'>
                <VStack spacing={6}>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel htmlFor='login'>Логин для входа на сайт</FormLabel>
                        <Input
                            id='login'
                            {...register('login')}
                            onBlur={() => {
                                const trimmed = watch('login').trim();
                                setValue('login', trimmed);
                                trigger('login');
                            }}
                            variant='sign'
                            placeholder='Введите логин'
                            data-test-id={LOGIN_INPUT}
                        />
                        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor='password'>Пароль</FormLabel>
                        <InputGroup>
                            <Input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                data-test-id={PASSWORD_INPUT}
                                variant='sign'
                                placeholder='Пароль для сайта'
                            />
                            <InputRightElement>
                                <Button
                                    size='md'
                                    variant='ghost'
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)}
                                    onTouchStart={() => setShowPassword(true)}
                                    onTouchEnd={() => setShowPassword(false)}
                                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                    data-test-id='password-visibility-button'
                                >
                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <HStack width='full'>
                        <Button
                            type='submit'
                            flex={1}
                            variant='darkWhite'
                            data-test-id='submit-button'
                            mt={6}
                        >
                            Войти
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </Box>
    );
};
