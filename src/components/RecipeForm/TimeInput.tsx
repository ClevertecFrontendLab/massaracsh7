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

interface TimeInputProps {
    control: Control<CreateRecipeInput>;
    error: boolean | undefined;
}

export const TimeInput: React.FC<TimeInputProps> = ({ control, error }) => (
    <FormControl isInvalid={!!error} mt={4}>
        <HStack gap={6}>
            <Text textStyle='formBoldText'>Сколько времени готовить в минутах?</Text>
            <Controller
                name='time'
                control={control}
                render={({ field }) => (
                    <NumberInput
                        max={10000}
                        value={field.value || undefined}
                        onChange={(valueString, valueAsNumber) => {
                            if (valueString === '-' || valueString === '') {
                                field.onChange(valueString);
                            } else if (!isNaN(valueAsNumber)) {
                                field.onChange(valueAsNumber);
                            }
                        }}
                        w={90}
                        variant='recipe'
                    >
                        <NumberInputField
                            data-test-id='recipe-time'
                            borderWidth='1px'
                            borderColor={error ? 'red.500' : 'inherit'}
                            _focus={{
                                borderColor: error ? 'red.500' : 'customLime.150',
                                boxShadow: error ? '0 0 0 1px red.500' : '0 0 0 1px customLime.150',
                            }}
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
