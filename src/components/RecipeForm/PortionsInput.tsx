import {
    FormControl,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';
import { PORTIONS_HELPER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { getFocusStyles } from '~/utils/getFocusStyles';
import { handleNumberInputChange } from '~/utils/handleNumberInputChange';

type PortionsInputProps = {
    control: Control<CreateRecipeInput>;
    error?: boolean;
};

export const PortionsInput: React.FC<PortionsInputProps> = ({ control, error }) => (
    <FormControl isInvalid={!!error}>
        <Controller
            control={control}
            name='portions'
            render={({ field }) => (
                <HStack gap={6}>
                    <Text textStyle='formBoldText'>{PORTIONS_HELPER}</Text>
                    <NumberInput
                        max={1000}
                        w={90}
                        variant='recipe'
                        value={field.value ?? ''}
                        onChange={(valueString, valueAsNumber) =>
                            handleNumberInputChange(valueString, valueAsNumber, field.onChange)
                        }
                    >
                        <NumberInputField
                            data-test-id={TEST_IDS.RECIPE_PORTIONS}
                            borderWidth='1px'
                            borderColor={error ? 'red.500' : 'inherit'}
                            _focus={getFocusStyles({ hasError: !!error })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
            )}
        />
    </FormControl>
);
