import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import type {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

import { EMAIL_INPUT, SUBMIT_BUTTON } from '~/constants/test-ids';

import type { EmailFormData } from './recoverySchema';

interface EmailStepFormProps {
    register: UseFormRegister<EmailFormData>;
    errors: FieldErrors<EmailFormData>;
    watch: UseFormWatch<EmailFormData>;
    setValue: UseFormSetValue<EmailFormData>;
    trigger: UseFormTrigger<EmailFormData>;
    onSubmitEmail: (data: EmailFormData) => void;
}

export const EmailStepForm = ({
    register,
    errors,
    watch,
    setValue,
    trigger,
    onSubmitEmail,
}: EmailStepFormProps) => (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            trigger('email').then((ok) => {
                if (ok) {
                    const data = watch();
                    onSubmitEmail(data);
                }
            });
        }}
        style={{ width: '100%' }}
    >
        <VStack spacing={6} align='stretch'>
            <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize='16px' mb={1}>
                    Ваш email
                </FormLabel>
                <Input
                    {...register('email')}
                    onBlur={() => {
                        const trimmed = watch().email.trim();
                        setValue('email', trimmed, { shouldValidate: true });
                    }}
                    data-test-id={EMAIL_INPUT}
                    placeholder='email'
                    variant='sign'
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Button type='submit' variant='darkWhite' w='full' data-test-id={SUBMIT_BUTTON}>
                Получить код
            </Button>
        </VStack>
    </form>
);
