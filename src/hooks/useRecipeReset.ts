import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';
import { Recipe } from '~/types/apiTypes';

export function useRecipeReset(recipe: Recipe | undefined, reset: UseFormReset<CreateRecipeInput>) {
    useEffect(() => {
        if (recipe) {
            reset({
                title: recipe.title ?? undefined,
                description: recipe.description ?? undefined,
                portions: recipe.portions ?? undefined,
                time: recipe.time ?? undefined,
                categoriesIds: recipe.categoriesIds ?? [],
                ingredients: recipe.ingredients.length
                    ? recipe.ingredients
                    : [{ title: undefined, count: undefined, measureUnit: undefined }],
                steps: recipe.steps.length
                    ? recipe.steps.map((step, i) => ({ ...step, stepNumber: i + 1 }))
                    : [{ description: undefined, stepNumber: 1, image: null }],
                image: recipe.image ?? undefined,
            });
        }
    }, [recipe, reset]);
}
