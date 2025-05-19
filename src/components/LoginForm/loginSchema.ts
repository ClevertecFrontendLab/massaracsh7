import { z } from 'zod';

export const loginSchema = z.object({
    login: z
        .string()
        .nonempty('Введите логин')
        .min(5, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
    password: z
        .string()
        .nonempty('Введите пароль')
        .min(8, 'Пароль должен быть не короче 8 символов')
        .max(50, 'Максимальная длина 50 символов')
        .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату')
        .regex(/[A-ZА-Я]/, 'Не соответствует формату')
        .regex(/\d/, 'Не соответствует формату'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
