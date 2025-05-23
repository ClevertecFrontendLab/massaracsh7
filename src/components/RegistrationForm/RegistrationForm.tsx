import { Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import modaldance from '~/assets/images/modal-dance.png';
import { API_RESULTS } from '~/constants/api-results';
import { FOOTER_SIGNUP_MESSAGE } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { useSignupMutation } from '~/query/services/auth';
import { setAppAlert, setAppModal } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { SignUpRequest } from '~/types/authTypes';

import { RegistrationFormData, registrationSchema } from './registrationSchema';
import { Step1Form } from './Step1Form';
import { Step2Form } from './Step2Form';
import { StepProgress } from './StepProgress';

export const RegistrationForm = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signup] = useSignupMutation();

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'onChange',
        shouldUnregister: false,
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
        },
    });

    const values = watch();
    const progress = useMemo(() => {
        const all: (keyof RegistrationFormData)[] = [
            'firstName',
            'lastName',
            'email',
            'login',
            'password',
            'confirmPassword',
        ];
        const valid = all.filter((f) => values[f] && !errors[f]).length;
        return Math.round((valid / all.length) * 100);
    }, [values, errors]);

    const onNext = async () => {
        if (await trigger(['firstName', 'lastName', 'email'])) {
            setStep(2);
        }
    };

    const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
        const { confirmPassword, ...payload } = data;
        try {
            await signup(payload as SignUpRequest).unwrap();
            navigate(ROUTES_PATH.LOG_IN);
            dispatch(
                setAppModal({
                    title: API_RESULTS.SUCCESS_SIGNUP_TITLE,
                    description: `Мы отправили вам на почту ${payload.email} ссылку для верификации.`,
                    imageSrc: modaldance,
                    footerNote: FOOTER_SIGNUP_MESSAGE,
                    dataId: TEST_IDS.SIGN_UP_SUCCESS_MODAL,
                }),
            );
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                const msg = (fetchErr.data as { message?: string })?.message;
                if (status === 400 && msg) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            sourse: 'auth',
                            title: msg,
                        }),
                    );
                } else if (String(status).startsWith('5')) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: API_RESULTS.ERROR_SERVER_TITLE,
                            sourse: 'auth',
                            message: API_RESULTS.ERROR_SERVER_MESSAGE,
                        }),
                    );
                }
            }
        }
    };

    return (
        <Box mx='auto'>
            <StepProgress step={step} progress={progress} />

            <form
                autoComplete='off'
                onSubmit={
                    step === 1
                        ? (e) => {
                              e.preventDefault();
                              onNext();
                          }
                        : handleSubmit(onSubmit)
                }
                data-test-id={TEST_IDS.SIGN_UP_FORM}
            >
                {step === 1 ? (
                    <Step1Form
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        setValue={setValue}
                        watch={watch}
                        onNext={onNext}
                    />
                ) : (
                    <Step2Form
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        setValue={setValue}
                        watch={watch}
                        onSubmit={handleSubmit(onSubmit)}
                    />
                )}
            </form>
        </Box>
    );
};
