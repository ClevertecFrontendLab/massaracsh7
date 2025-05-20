import { z } from 'zod';

import {
    FORMAT_ERROR,
    LOGIN_NONEMPTY,
    MAXLENGTH_ERROR,
    PASSWORD_NONEMPTY,
} from '~/constants/validation-messages';

export const loginSchema = z.object({
    login: z
        .string()
        .nonempty(LOGIN_NONEMPTY)
        .min(5, FORMAT_ERROR)
        .max(50, MAXLENGTH_ERROR)
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR),
    password: z
        .string()
        .nonempty(PASSWORD_NONEMPTY)
        .min(8, FORMAT_ERROR)
        .max(50, MAXLENGTH_ERROR)
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, FORMAT_ERROR)
        .regex(/[A-ZА-Я]/, FORMAT_ERROR)
        .regex(/\d/, FORMAT_ERROR),
});

export type LoginFormData = z.infer<typeof loginSchema>;
