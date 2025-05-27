import { z } from 'zod';

const ingredientSchema = z.object({
    title: z.string().trim().max(50, 'Не более 50 символов').optional(),
    count: z.number().positive('Должно быть положительным числом'),
    measureUnit: z.string(),
});

const stepSchema = z.object({
    stepNumber: z.number().int().positive(),
    description: z
        .string()
        .trim()
        .max(300, 'Не более 300 символов')
        .transform((val) => (val === '' ? undefined : val))
        .optional(),
    image: z
        .string()
        .trim()
        .transform((val) => (val === '' ? undefined : val))
        .optional(),
});

const recipeBase = {
    title: z
        .string()
        .trim()
        .max(50, 'Не более 50 символов')
        .transform((val) => (val === '' ? undefined : val))
        .optional(),
    description: z
        .string()
        .trim()
        .max(500, 'Не более 500 символов')
        .transform((val) => (val === '' ? undefined : val))
        .optional(),
    time: z
        .number()
        .positive('Должно быть положительным числом')
        .max(10000, 'Не более 10000 минут'),
    portions: z.number().positive('Должно быть положительным числом'),
    categoriesIds: z.array(z.string()).min(3, 'Выберите минимум 3 категории'),
    image: z
        .string()
        .trim()
        .transform((val) => (val === '' ? undefined : val))
        .optional(),
};

export const createRecipeSchema = z.object({
    ...recipeBase,
    ingredients: z.array(ingredientSchema).min(1, 'Добавьте хотя бы один ингредиент'),
    steps: z.array(stepSchema).min(1, 'Добавьте хотя бы один шаг'),
});

export const draftRecipeSchema = createRecipeSchema.partial();

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type DraftRecipeInput = z.infer<typeof draftRecipeSchema>;
