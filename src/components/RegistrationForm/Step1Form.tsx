import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import type {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

import { RegistrationFormData } from './registrationSchema';

interface Step1FormProps {
    register: UseFormRegister<RegistrationFormData>;
    errors: FieldErrors<RegistrationFormData>;
    trigger: UseFormTrigger<RegistrationFormData>;
    setValue: UseFormSetValue<RegistrationFormData>;
    watch: UseFormWatch<RegistrationFormData>;
    onNext: () => void;
}

export const Step1Form = ({
    register,
    errors,
    trigger,
    setValue,
    watch,
    onNext,
}: Step1FormProps) => (
    <VStack spacing={6}>
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
                variant='sign'
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
                variant='sign'
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
                variant='sign'
                data-test-id='email-input'
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button
            onClick={onNext}
            variant='darkWhite'
            width='full'
            data-test-id='submit-button'
            mt={6}
        >
            Дальше
        </Button>
    </VStack>
);
