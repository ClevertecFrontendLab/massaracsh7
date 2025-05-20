import { z } from 'zod';

import {
    CONFIRM_PASSWORD_ERROR,
    CONFIRM_PASSWORD_NONEMPTY,
    EMAIL_ERROR,
    EMAIL_NONEMPTY,
    FORMAT_ERROR,
    MAXLENGTH_ERROR,
    PASSWORD_NONEMPTY,
} from '~/constants/validation-messages';

export const emailSchema = z.object({
    email: z.string().nonempty(EMAIL_NONEMPTY).max(50, MAXLENGTH_ERROR).email(EMAIL_ERROR),
});

export const resetSchema = z
    .object({
        email: z.string(),
        login: z
            .string()
            .min(5, FORMAT_ERROR)
            .max(50, MAXLENGTH_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR),
        password: z
            .string()
            .nonempty(PASSWORD_NONEMPTY)
            .max(50, MAXLENGTH_ERROR)
            .min(8, FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR)
            .regex(/[A-ZА-Я]/, FORMAT_ERROR)
            .regex(/\d/, FORMAT_ERROR),
        passwordConfirm: z.string().nonempty(CONFIRM_PASSWORD_NONEMPTY),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: CONFIRM_PASSWORD_ERROR,
        path: ['passwordConfirm'],
    });

export type EmailFormData = z.infer<typeof emailSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;
