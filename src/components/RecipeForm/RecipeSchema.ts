import { z } from 'zod';

import { VALIDATION_MESSAGES } from '~/constants/validation-messages';

export const createOrUpdateRecipeSchema = z.object({
    title: z
        .string()
        .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR_50)
        .nonempty(VALIDATION_MESSAGES.REQUIRED_FIELD),
    description: z
        .string()
        .trim()
        .max(500, VALIDATION_MESSAGES.MAXLENGTH_ERROR_500)
        .nonempty(VALIDATION_MESSAGES.REQUIRED_FIELD),
    image: z.string().nonempty(VALIDATION_MESSAGES.IMAGE_REQUIRED),
    portions: z.number().positive(VALIDATION_MESSAGES.POSITIVE_NUMBER),
    time: z
        .number()
        .positive(VALIDATION_MESSAGES.POSITIVE_NUMBER)
        .max(10000, VALIDATION_MESSAGES.MAX_TIME),
    categoriesIds: z.array(z.string()).min(3, VALIDATION_MESSAGES.MIN_CATEGORIES),
    ingredients: z.array(
        z.object({
            title: z
                .string()
                .max(50, VALIDATION_MESSAGES.MAXLENGTH_ERROR_50)
                .nonempty(VALIDATION_MESSAGES.REQUIRED_FIELD),
            count: z.number().positive(VALIDATION_MESSAGES.POSITIVE_COUNT),
            measureUnit: z.string().nonempty(VALIDATION_MESSAGES.REQUIRED_FIELD),
        }),
    ),
    steps: z.array(
        z.object({
            stepNumber: z.number().int().positive(),
            description: z
                .string()
                .max(300, VALIDATION_MESSAGES.MAXLENGTH_ERROR_300)
                .nonempty(VALIDATION_MESSAGES.REQUIRED_FIELD),
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
