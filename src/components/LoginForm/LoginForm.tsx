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
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

import { useLoginMutation } from '~/query/services/auth';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { LoginRequest } from '~/types/authTypes';

const schema = z.object({
    login: z.string().nonempty('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: z.string().nonempty('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});

type IForm = z.infer<typeof schema>;

export const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm<IForm>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        shouldUnregister: true,
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const onSubmit = async (data: IForm) => {
        try {
            await login(data as LoginRequest).unwrap();
            navigate('/');
        } catch (err: unknown) {
            let errorMessage = 'Произошла ошибка';

            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                const data = fetchErr.data as { message?: string };
                const message = data?.message || 'Неизвестная ошибка';

                if (status === 401) {
                    errorMessage = 'Неверный логин или пароль.';
                } else if (status === 403) {
                    errorMessage = 'Необходимо подтверждение email пользователя.';
                } else if (String(status).startsWith('5')) {
                    errorMessage = 'Ошибка сервера. Попробуйте ещё раз.';
                } else {
                    errorMessage = message;
                }
            } else {
                const serializedErr = err as SerializedError;
                errorMessage = serializedErr.message ?? 'Неизвестная ошибка';
            }

            dispatch(setAppError(errorMessage));
        }
    };

    return (
        <Box maxW='400px' mx='auto' mt='50px'>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
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
                            />
                            <InputRightElement>
                                <Button
                                    size='sm'
                                    variant='ghost'
                                    onMouseDown={() => setShowPassword(true)}
                                    onMouseUp={() => setShowPassword(false)}
                                    onMouseLeave={() => setShowPassword(false)}
                                >
                                    👁
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>

                    <HStack width='full'>
                        <Button
                            type='submit'
                            flex={1}
                            colorScheme='blue'
                            isLoading={isLoading}
                            isDisabled={!isValid}
                        >
                            Войти
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </Box>
    );
};
