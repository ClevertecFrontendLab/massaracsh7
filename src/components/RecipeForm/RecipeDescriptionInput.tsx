import { FormControl, Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';
import { TEST_IDS } from '~/constants/test-ids';

interface RecipeDescriptionInputProps {
    register: UseFormRegister<CreateRecipeInput>;
    error: boolean | undefined;
}

export const RecipeDescriptionInput: React.FC<RecipeDescriptionInputProps> = ({
    register,
    error,
}) => (
    <FormControl isInvalid={!!error}>
        <Textarea
            variant='recipe-descr'
            placeholder='Описание'
            {...register('description')}
            data-test-id={TEST_IDS.RECIPE_DESCRIPTION}
        />
    </FormControl>
);
