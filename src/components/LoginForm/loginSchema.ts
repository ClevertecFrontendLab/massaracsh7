import { z } from 'zod';

import { VALIDATION_MESSAGES } from '~/constants/validation-messages';

export const loginSchema = z.object({
    login: z
        .string()
        .nonempty(VALIDATION_MESSAGES.LOGIN_NONEMPTY)
        .min(5, VALIDATION_MESSAGES.FORMAT_ERROR)
        .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR),
    password: z
        .string()
        .nonempty(VALIDATION_MESSAGES.PASSWORD_NONEMPTY)
        .min(8, VALIDATION_MESSAGES.FORMAT_ERROR)
        .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR)
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, VALIDATION_MESSAGES.FORMAT_ERROR)
        .regex(/[A-ZА-Я]/, VALIDATION_MESSAGES.FORMAT_ERROR)
        .regex(/\d/, VALIDATION_MESSAGES.FORMAT_ERROR),
});

export type LoginFormData = z.infer<typeof loginSchema>;
