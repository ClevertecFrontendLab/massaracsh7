import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';

import {
    CONFIRM_PASSWORD_INPUT,
    LOGIN_INPUT,
    PASSWORD_INPUT,
    SUBMIT_BUTTON,
} from '~/constants/test-ids';
import { LOGIN_HELPER, PASSWORD_HELPER } from '~/constants/validation-messages';

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
}: ResetStepFormProps) => {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
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
                    <FormLabel textStyle='nav' fontSize='16px'>
                        Введите логин
                    </FormLabel>
                    <Input
                        {...register('login')}
                        onBlur={() => {
                            const trimmed = watch('login').trim();
                            setValue('login', trimmed, { shouldValidate: true });
                            trigger('login');
                        }}
                        variant='sign'
                        data-test-id={LOGIN_INPUT}
                    />
                    <FormHelperText>{LOGIN_HELPER}</FormHelperText>
                    <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel textStyle='nav' fontSize='16px'>
                        Пароль
                    </FormLabel>
                    <InputGroup>
                        <Input
                            id='password'
                            type={showPwd ? 'text' : 'password'}
                            {...register('password')}
                            variant='sign'
                            data-test-id={PASSWORD_INPUT}
                        />
                        <InputRightElement>
                            <IconButton
                                size='sm'
                                variant='ghost'
                                aria-label={showPwd ? 'Скрыть пароль' : 'Показать пароль'}
                                icon={
                                    showPwd ? (
                                        <ViewOffIcon boxSize='18px' />
                                    ) : (
                                        <ViewIcon boxSize='18px' />
                                    )
                                }
                                onMouseDown={() => setShowPwd(true)}
                                onMouseUp={() => setShowPwd(false)}
                                onMouseLeave={() => setShowPwd(false)}
                                onTouchStart={() => setShowPwd(true)}
                                onTouchEnd={() => setShowPwd(false)}
                                pt={3}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText>{PASSWORD_HELPER}</FormHelperText>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.passwordConfirm}>
                    <FormLabel textStyle='nav' fontSize='16px'>
                        Повторите пароль
                    </FormLabel>
                    <InputGroup>
                        <Input
                            id='passwordConfirm'
                            type={showConfirm ? 'text' : 'password'}
                            {...register('passwordConfirm')}
                            variant='sign'
                            data-test-id={CONFIRM_PASSWORD_INPUT}
                        />
                        <InputRightElement>
                            <IconButton
                                size='sm'
                                variant='ghost'
                                aria-label={showConfirm ? 'Скрыть пароль' : 'Показать пароль'}
                                icon={
                                    showConfirm ? (
                                        <ViewOffIcon boxSize='18px' />
                                    ) : (
                                        <ViewIcon boxSize='18px' />
                                    )
                                }
                                onMouseDown={() => setShowConfirm(true)}
                                onMouseUp={() => setShowConfirm(false)}
                                onMouseLeave={() => setShowConfirm(false)}
                                onTouchStart={() => setShowConfirm(true)}
                                onTouchEnd={() => setShowConfirm(false)}
                                pt={3}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
                </FormControl>

                <Button type='submit' variant='darkWhite' w='full' data-test-id={SUBMIT_BUTTON}>
                    Зарегистрироваться
                </Button>
            </VStack>
        </form>
    );
};
