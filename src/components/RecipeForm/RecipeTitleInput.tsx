import { FormControl, Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';

interface RecipeTitleInputProps {
    register: UseFormRegister<CreateRecipeInput>;
    error: boolean | undefined;
}

export const RecipeTitleInput: React.FC<RecipeTitleInputProps> = ({ register, error }) => (
    <FormControl isInvalid={!!error}>
        <Input
            variant='recipetitle'
            placeholder='Название рецепта'
            {...register('title')}
            data-test-id='recipe-title'
        />
    </FormControl>
);
