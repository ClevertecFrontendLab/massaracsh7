import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import type {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

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
        <VStack spacing={4} align='stretch'>
            <FormControl isInvalid={!!errors.email}>
                <FormLabel>Ваш email</FormLabel>
                <Input
                    {...register('email')}
                    onBlur={() => {
                        const trimmed = watch().email.trim();
                        setValue('email', trimmed, { shouldValidate: true });
                    }}
                    data-test-id='email-input'
                    placeholder='email'
                    variant='sign'
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Button mt={2} type='submit' variant='darkWhite' w='full' data-test-id='submit-button'>
                Получить код
            </Button>
        </VStack>
    </form>
);
