import { z } from 'zod';

// const ingredientSchema = z.object({
//     title: z
//         .string()
//         .trim()
//         .max(50, 'Не более 50 символов')
//         .transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Название обязательно' }),
//     count: z.number().positive('Должно быть положительным числом'),
//     measureUnit: z.string().transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Название обязательно' }),
// });

// const stepSchema = z.object({
//     stepNumber: z.number().int().positive(),
//     description: z
//         .string()
//         .trim()
//         .max(300, 'Не более 300 символов')
//         .transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Описание шага обязательно' }),
//     image: z
//         .string()
//         .trim()
//         .transform((val) => (val === '' ? undefined : val))
//         .optional(),
// });

// const recipeBase = {
//     title: z
//         .string()
//         .trim()
//         .max(50, 'Не более 50 символов')
//         .transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Обязательное поле' }),
//     description: z
//         .string()
//         .trim()
//         .max(500, 'Не более 500 символов')
//         .transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Обязательное поле' }),
//     time: z
//         .number()
//         .positive('Должно быть положительным числом')
//         .max(10000, 'Не более 10000 минут'),
//     portions: z.number().positive('Должно быть положительным числом'),
//     categoriesIds: z.array(z.string()).min(3, 'Выберите минимум 3 категории'),
//     image: z
//         .string()
//         .trim()
//         .transform((val) => (val === '' ? undefined : val))
//         .refine((val) => val !== undefined, { message: 'Обязательное поле' }),
// };

// export const createOrUpdateRecipeSchema = z.object({
//     title: recipeBase.title,
//     description: recipeBase.description,
//     time: recipeBase.time,
//     portions: recipeBase.portions,
//     categoriesIds: recipeBase.categoriesIds,
//     image: recipeBase.image,
//     ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент'),
//     steps: z.array(stepSchema).min(1, 'Добавьте хотя бы один шаг'),
// });

// export const draftRecipeSchema = z.object({
//     title: recipeBase.title,
//     description: recipeBase.description.optional(),
//     time: recipeBase.time.optional(),
//     portions: recipeBase.portions.optional(),
//     categoriesIds: z.array(z.string()).optional(),
//     image: recipeBase.image.optional(),
//     ingredients: z.array(ingredientSchema).optional(),
//     steps: z.array(stepSchema).optional(),
// });

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

// export const draftRecipeSchema = z.object({
//   title: z.string().max(50, 'Максимум 50 символов').nonempty('Обязательное поле'),

//   description: z
//     .string()
//     .max(500, 'Максимум 500 символов')
//     .optional()
//     .transform((val) => (val === '' ? undefined : val)),

//   image: z.string().nonempty('Изображение обязательно').optional().transform((val) => (val === '' ? undefined : val)),

//   portions: z
//     .number({ invalid_type_error: 'Должно быть числом' })
//     .positive('Должно быть положительным числом')
//     .optional(),

//   time: z
//     .number({ invalid_type_error: 'Должно быть числом' })
//     .positive('Должно быть положительным числом')
//     .max(10000, 'Максимум 10000')
//     .optional(),

//   categoriesIds: z
//     .array(z.string())
//     .min(3, 'Выберите минимум 3 категории')
//     .optional(),

//   ingredients: z
//     .array(
//       z.object({
//         title: z.string().max(50, 'Максимум 50 символов').transform((val) => (val === '' ? undefined : val)),
//         count: z.number().positive('Количество должно быть положительным'),
//         measureUnit: z.string(),
//       })
//     )
//     .optional(),

//   steps: z
//     .array(
//       z.object({
//         description: z.string().max(300, 'Максимум 300 символов').transform((val) => (val === '' ? undefined : val)),
//         image: z.string().optional(),
//       })
//     )
//     .optional(),
// });
export type CreateRecipeInput = z.infer<typeof createOrUpdateRecipeSchema>;
// export type DraftRecipeInput = z.infer<typeof draftRecipeSchema>;
