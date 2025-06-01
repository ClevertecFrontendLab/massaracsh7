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
import { TIME_HELPER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { getFocusStyles } from '~/utils/getFocusStyles';
import { handleNumberInputChange } from '~/utils/handleNumberInputChange';

type TimeInputProps = {
    control: Control<CreateRecipeInput>;
    error?: boolean;
};

export const TimeInput: React.FC<TimeInputProps> = ({ control, error }) => (
    <FormControl isInvalid={!!error} mt={4}>
        <HStack gap={6}>
            <Text textStyle='formBoldText'>{TIME_HELPER}</Text>
            <Controller
                name='time'
                control={control}
                render={({ field }) => (
                    <NumberInput
                        max={10000}
                        value={field.value || undefined}
                        onChange={(valueString, valueAsNumber) =>
                            handleNumberInputChange(valueString, valueAsNumber, field.onChange)
                        }
                        w={90}
                        variant='recipe'
                    >
                        <NumberInputField
                            data-test-id={TEST_IDS.RECIPE_TIME}
                            borderWidth='1px'
                            borderColor={error ? 'red.500' : 'inherit'}
                            _focus={getFocusStyles({ hasError: !!error })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                )}
            />
        </HStack>
    </FormControl>
);
