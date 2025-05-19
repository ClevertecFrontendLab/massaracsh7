import { z } from 'zod';

export const emailSchema = z.object({
    email: z
        .string()
        .nonempty('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .email('Введите корректный e-mail'),
});

export const resetSchema = z
    .object({
        email: z.string(),
        login: z
            .string()
            .min(5, 'Не соответствует формату')
            .max(50, 'Максимальная длина 50 символов')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
        password: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Не соответствует формату')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
        passwordConfirm: z.string().nonempty('Повторите пароль'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Пароли должны совпадать',
        path: ['passwordConfirm'],
    });

export type EmailFormData = z.infer<typeof emailSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;
