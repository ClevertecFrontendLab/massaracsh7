import { z } from 'zod';

import {
    ALPHABET_ERROR,
    CAPITAL_ERROR,
    CONFIRM_PASSWORD_ERROR,
    CONFIRM_PASSWORD_NONEMPTY,
    EMAIL_ERROR,
    EMAIL_NONEMPTY,
    FIRSTNAME_NONEMPTY,
    FORMAT_ERROR,
    LASTNAME_NONEMPTY,
    LOGIN_NONEMPTY,
    MAXLENGTH_ERROR,
    PASSWORD_NONEMPTY,
} from '~/constants/validation-messages';

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .nonempty(FIRSTNAME_NONEMPTY)
            .max(50, MAXLENGTH_ERROR)
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: CAPITAL_ERROR,
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: ALPHABET_ERROR,
            }),
        lastName: z
            .string()
            .nonempty(LASTNAME_NONEMPTY)
            .max(50, MAXLENGTH_ERROR)
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: CAPITAL_ERROR,
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: ALPHABET_ERROR,
            }),
        email: z.string().nonempty(EMAIL_NONEMPTY).max(50, MAXLENGTH_ERROR).email(EMAIL_ERROR),
        login: z
            .string()
            .nonempty(LOGIN_NONEMPTY)
            .max(50, MAXLENGTH_ERROR)
            .min(5, FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR),
        password: z
            .string()
            .nonempty(PASSWORD_NONEMPTY)
            .max(50, MAXLENGTH_ERROR)
            .min(8, FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR)
            .regex(/[A-ZА-Я]/, FORMAT_ERROR)
            .regex(/\d/, FORMAT_ERROR),
        confirmPassword: z.string().nonempty(CONFIRM_PASSWORD_NONEMPTY),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: CONFIRM_PASSWORD_ERROR,
        path: ['confirmPassword'],
    });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
