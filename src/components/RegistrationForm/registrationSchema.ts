import { z } from 'zod';

import { VALIDATION_MESSAGES } from '~/constants/validation-messages';

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .nonempty(VALIDATION_MESSAGES.FIRSTNAME_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: VALIDATION_MESSAGES.CAPITAL_ERROR,
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: VALIDATION_MESSAGES.ALPHABET_ERROR,
            }),
        lastName: z
            .string()
            .nonempty(VALIDATION_MESSAGES.LASTNAME_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: VALIDATION_MESSAGES.CAPITAL_ERROR,
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: VALIDATION_MESSAGES.ALPHABET_ERROR,
            }),
        email: z
            .string()
            .nonempty(VALIDATION_MESSAGES.EMAIL_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .email(VALIDATION_MESSAGES.EMAIL_ERROR),
        login: z
            .string()
            .nonempty(VALIDATION_MESSAGES.LOGIN_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .min(5, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR),
        password: z
            .string()
            .nonempty(VALIDATION_MESSAGES.PASSWORD_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .min(8, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/[A-ZА-Я]/, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/\d/, VALIDATION_MESSAGES.FORMAT_ERROR),
        confirmPassword: z.string().nonempty(VALIDATION_MESSAGES.CONFIRM_PASSWORD_NONEMPTY),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: VALIDATION_MESSAGES.CONFIRM_PASSWORD_ERROR,
        path: ['confirmPassword'],
    });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
