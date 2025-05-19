import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

import type { ResetFormData } from './recoverySchema';

interface ResetStepFormProps {
    register: UseFormRegister<ResetFormData>;
    errors: FieldErrors<ResetFormData>;
    watch: UseFormWatch<ResetFormData>;
    getValues: UseFormGetValues<ResetFormData>;
    setValue: UseFormSetValue<ResetFormData>;
    trigger: UseFormTrigger<ResetFormData>;
    onSubmitReset: (data: ResetFormData) => void;
}

export const ResetStepForm = ({
    register,
    errors,
    watch,
    getValues,
    setValue,
    trigger,
    onSubmitReset,
}: ResetStepFormProps) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            const values = getValues();
            onSubmitReset(values);
        }}
        style={{ width: '100%' }}
    >
        <VStack spacing={6}>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel>Введите логин</FormLabel>
                <Input
                    {...register('login')}
                    onBlur={() => {
                        const trimmed = watch('login').trim();
                        setValue('login', trimmed, { shouldValidate: true });
                        trigger('login');
                    }}
                    variant='sign'
                    data-test-id='login-input'
                />
                <FormHelperText>Не менее 5 символов, только латиница</FormHelperText>
                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
                <FormLabel>Пароль</FormLabel>
                <Input
                    type='password'
                    {...register('password')}
                    data-test-id='password-input'
                    variant='sign'
                />
                <FormHelperText>Не менее 8 символов, с заглавной буквой и цифрой</FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordConfirm}>
                <FormLabel>Повторите пароль</FormLabel>
                <Input
                    type='password'
                    {...register('passwordConfirm')}
                    data-test-id='confirm-password-input'
                    variant='sign'
                />
                <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
            </FormControl>

            <Button type='submit' variant='darkWhite' w='full' data-test-id='submit-button'>
                Зарегистрироваться
            </Button>
        </VStack>
    </form>
);
