import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import type {
    FieldErrors,
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

import { RegistrationFormData } from './registrationSchema';

interface Step2FormProps {
    register: UseFormRegister<RegistrationFormData>;
    errors: FieldErrors<RegistrationFormData>;
    trigger: UseFormTrigger<RegistrationFormData>;
    watch: UseFormWatch<RegistrationFormData>;
    setValue: UseFormSetValue<RegistrationFormData>;
    onSubmit: () => void;
}

export const Step2Form = ({
    register,
    errors,
    trigger,
    watch,
    setValue,
    onSubmit,
}: Step2FormProps) => {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <VStack spacing={6}>
            <FormControl isInvalid={!!errors.login}>
                <FormLabel htmlFor='login' textStyle='nav' fontSize='16px'>
                    Логин для входа на сайт
                </FormLabel>
                <Input
                    id='login'
                    {...register('login')}
                    onBlur={() => {
                        const trimmed = watch('login').trim();
                        setValue('login', trimmed);
                        trigger('login');
                    }}
                    variant='sign'
                    data-test-id={LOGIN_INPUT}
                    placeholder='Логин'
                />
                <FormHelperText mt={0} textAlign='left'>
                    {LOGIN_HELPER}
                </FormHelperText>
                <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password' textStyle='nav' fontSize='16px'>
                    Пароль
                </FormLabel>
                <InputGroup>
                    <Input
                        id='password'
                        type={showPwd ? 'text' : 'password'}
                        {...register('password')}
                        variant='sign'
                        data-test-id={PASSWORD_INPUT}
                        placeholder='Пароль'
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
                <FormHelperText mt={0} textAlign='left'>
                    {PASSWORD_HELPER}
                </FormHelperText>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel htmlFor='confirmPassword' textStyle='nav' fontSize='16px'>
                    Повторите пароль
                </FormLabel>
                <InputGroup>
                    <Input
                        id='confirmPassword'
                        type={showConfirm ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        variant='sign'
                        data-test-id={CONFIRM_PASSWORD_INPUT}
                        placeholder='Пароль'
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
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <HStack width='full' spacing={4}>
                <Button
                    type='submit'
                    flex={1}
                    variant='darkWhite'
                    data-test-id={SUBMIT_BUTTON}
                    mt={6}
                    onClick={onSubmit}
                >
                    Зарегистрироваться
                </Button>
            </HStack>
        </VStack>
    );
};
