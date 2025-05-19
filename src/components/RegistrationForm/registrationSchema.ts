import { z } from 'zod';

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .nonempty('Введите имя')
            .max(50, 'Максимальная длина 50 символов')
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: 'Должно начинаться с кириллицы А-Я',
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: 'Только кириллица А-Я, и "-"',
            }),
        lastName: z
            .string()
            .nonempty('Введите фамилию')
            .max(50, 'Максимальная длина 50 символов')
            .refine((val) => /^[А-ЯЁ]$/.test(val[0]), {
                message: 'Должно начинаться с кириллицы А-Я',
            })
            .refine((val) => val.slice(1).match(/^[А-Яа-яЁё-]*$/), {
                message: 'Только кириллица А-Я, и "-"',
            }),
        email: z
            .string()
            .nonempty('Введите e-mail')
            .max(50, 'Максимальная длина 50 символов')
            .email('Введите корректный e-mail'),
        login: z
            .string()
            .nonempty('Введите логин')
            .max(50, 'Максимальная длина 50 символов')
            .min(5, 'Не соответствует формату')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату'),
        password: z
            .string()
            .nonempty('Введите пароль')
            .max(50, 'Максимальная длина 50 символов')
            .min(8, 'Не соответствует формату')
            .regex(/^[A-Za-z0-9!@#$&_*+\-.]+$/, 'Не соответствует формату')
            .regex(/[A-ZА-Я]/, 'Не соответствует формату')
            .regex(/\d/, 'Не соответствует формату'),
        confirmPassword: z.string().nonempty('Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
