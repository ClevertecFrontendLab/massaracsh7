import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import type {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

import { TEST_IDS } from '~/constants/test-ids';

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
            <FormLabel htmlFor='firstName' textStyle='nav' fontSize='16px'>
                Ваше имя
            </FormLabel>
            <Input
                id='firstName'
                {...register('firstName')}
                onBlur={() => {
                    const trimmed = watch('firstName').trim();
                    setValue('firstName', trimmed);
                    trigger('firstName');
                }}
                variant='sign'
                data-test-id={TEST_IDS.FIRST_NAME_INPUT}
                placeholder='Имя'
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
            <FormLabel htmlFor='lastName' textStyle='nav' fontSize='16px'>
                Ваша фамилия
            </FormLabel>
            <Input
                id='lastName'
                {...register('lastName')}
                onBlur={() => {
                    const trimmed = watch('lastName').trim();
                    setValue('lastName', trimmed);
                    trigger('lastName');
                }}
                variant='sign'
                data-test-id={TEST_IDS.LAST_NAME_INPUT}
                placeholder='Фамилия'
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor='email' textStyle='nav' fontSize='16px'>
                Email
            </FormLabel>
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
                data-test-id={TEST_IDS.EMAIL_INPUT}
                placeholder='email'
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button
            onClick={onNext}
            variant='darkWhite'
            width='full'
            data-test-id={TEST_IDS.SUBMIT_BUTTON}
            mt={6}
        >
            Дальше
        </Button>
    </VStack>
);
