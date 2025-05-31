import { z } from 'zod';

export const createOrUpdateRecipeSchema = z.object({
    title: z.string().max(50, 'Максимум 50 символов').nonempty('Обязательное поле'),
    description: z.string().trim().max(500, 'Не более 500 символов').nonempty('Обязательное поле'),
    image: z.string().nonempty('Изображение обязательно'),
    portions: z.number().positive('Должно быть положительным числом'),
    time: z.number().positive('Должно быть положительным числом').max(10000, 'Максимум 10000'),
    categoriesIds: z.array(z.string()).min(3, 'Выберите минимум 3 категории'),
    ingredients: z.array(
        z.object({
            title: z.string().max(50, 'Максимум 50 символов').nonempty('Обязательное поле'),
            count: z.number().positive('Количество должно быть положительным'),
            measureUnit: z.string().nonempty('Обязательное поле'),
        }),
    ),
    steps: z.array(
        z.object({
            stepNumber: z.number().int().positive(),
            description: z.string().max(300, 'Максимум 300 символов').nonempty('Обязательное поле'),
            image: z
                .string()
                .nullable()
                .transform((val) => {
                    if (!val || val.trim() === '') return null;
                    return val;
                })
                .optional(),
        }),
    ),
});

export type CreateRecipeInput = z.infer<typeof createOrUpdateRecipeSchema>;
