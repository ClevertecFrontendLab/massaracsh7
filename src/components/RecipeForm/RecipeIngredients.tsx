import { DeleteIcon } from '@chakra-ui/icons';
import {
    FormControl,
    Grid,
    HStack,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import {
    Control,
    Controller,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister,
} from 'react-hook-form';

import { ButtonPlusLg, ButtonPlusWhite } from '~/assets/icons/icons';
import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';
import { Unit } from '~/types/apiTypes';

interface RecipeIngredientsProps {
    ingredientFields: FieldArrayWithId<CreateRecipeInput, 'ingredients', 'id'>[];
    register: UseFormRegister<CreateRecipeInput>;
    control: Control<CreateRecipeInput>;
    errors: FieldErrors<CreateRecipeInput>;
    appendIngredient: UseFieldArrayAppend<CreateRecipeInput, 'ingredients'>;
    removeIngredient: UseFieldArrayRemove;
    unitData?: Unit[];
}

export const RecipeIngredients = ({
    ingredientFields,
    register,
    control,
    errors,
    appendIngredient,
    removeIngredient,
    unitData,
}: RecipeIngredientsProps) => (
    <Stack maxW={{ base: '606px', xl: '668px' }} w='100%' m='0 auto'>
        <Stack spacing={{ base: 3, xl: 4 }} mb={10}>
            <HStack spacing={2} mb={4}>
                <Text textStyle='formBoldText'>Добавьте ингредиенты рецепта, нажав на</Text>
                <ButtonPlusWhite />
            </HStack>

            <Grid
                h={6}
                templateColumns='247px 125px 203px'
                gap={{ base: 3, xl: 4 }}
                alignItems='center'
                fontWeight='600'
                fontSize='12px'
                color='customLime.600'
                textAlign='left'
            >
                <Text pl='24px'>Ингредиент</Text>
                <Text>Количество</Text>
                <Text>Единица измерения</Text>
            </Grid>

            {ingredientFields.map((field, index) => (
                <SimpleGrid
                    key={field.id}
                    gap={{ base: 3, xl: 4 }}
                    templateColumns={{
                        base: '80px 192px 32px',
                        sm: '241px 80px 215px 32px',
                        xl: '295px 80px 215px 32px',
                    }}
                >
                    <FormControl
                        isInvalid={!!errors.ingredients?.[index]?.title}
                        gridColumn={{ base: '1 / 4', sm: '1' }}
                    >
                        <Input
                            variant='recipe'
                            placeholder='Ингредиент'
                            {...register(`ingredients.${index}.title`)}
                            data-test-id={`recipe-ingredients-title-${index}`}
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.ingredients?.[index]?.count}>
                        <Controller
                            name={`ingredients.${index}.count`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <NumberInput
                                    step={1}
                                    value={value || undefined}
                                    onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
                                >
                                    <NumberInputField
                                        placeholder='100'
                                        data-test-id={`recipe-ingredients-count-${index}`}
                                        _focus={{
                                            borderColor: errors.ingredients?.[index]?.count
                                                ? 'red.500'
                                                : 'customLime.150',
                                            boxShadow: errors.ingredients?.[index]?.count
                                                ? '0 0 0 1px red.500'
                                                : '0 0 0 1px customLime.150',
                                        }}
                                    />
                                </NumberInput>
                            )}
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.ingredients?.[index]?.measureUnit}>
                        <Controller
                            control={control}
                            name={`ingredients.${index}.measureUnit`}
                            render={({ field }) => (
                                <Select
                                    placeholder='Единица измерен...'
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    data-test-id={`recipe-ingredients-measureUnit-${index}`}
                                    _focus={{
                                        borderColor: errors.ingredients?.[index]?.measureUnit
                                            ? 'red.500'
                                            : 'customLime.150',
                                        boxShadow: errors.ingredients?.[index]?.measureUnit
                                            ? '0 0 0 1px red.500'
                                            : '0 0 0 1px customLime.150',
                                    }}
                                >
                                    {unitData?.map((unit) => (
                                        <option key={unit._id} value={unit.name}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    {index === ingredientFields.length - 1 ? (
                        <IconButton
                            aria-label='Добавить ингредиент'
                            variant='ghost'
                            onClick={() =>
                                appendIngredient({ title: '', count: 1, measureUnit: '' })
                            }
                            data-test-id='recipe-ingredients-add-ingredients'
                            icon={<ButtonPlusLg w='32px' h='32px' />}
                        />
                    ) : (
                        <IconButton
                            aria-label='Удалить ингредиент'
                            icon={<DeleteIcon />}
                            colorScheme='customLime'
                            variant='ghost'
                            onClick={() => removeIngredient(index)}
                            data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                        />
                    )}
                </SimpleGrid>
            ))}
        </Stack>
    </Stack>
);
