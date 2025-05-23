import { z } from 'zod';

import { VALIDATION_MESSAGES } from '~/constants/validation-messages';

export const emailSchema = z.object({
    email: z
        .string()
        .nonempty(VALIDATION_MESSAGES.EMAIL_NONEMPTY)
        .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
        .email(VALIDATION_MESSAGES.EMAIL_ERROR),
});

export const resetSchema = z
    .object({
        email: z.string(),
        login: z
            .string()
            .min(5, VALIDATION_MESSAGES.FORMAT_ERROR)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR),
        password: z
            .string()
            .nonempty(VALIDATION_MESSAGES.PASSWORD_NONEMPTY)
            .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
            .min(8, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/[A-ZА-Я]/, VALIDATION_MESSAGES.FORMAT_ERROR)
            .regex(/\d/, VALIDATION_MESSAGES.FORMAT_ERROR),
        passwordConfirm: z.string().nonempty(VALIDATION_MESSAGES.CONFIRM_PASSWORD_NONEMPTY),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: VALIDATION_MESSAGES.CONFIRM_PASSWORD_ERROR,
        path: ['passwordConfirm'],
    });

export type EmailFormData = z.infer<typeof emailSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;
