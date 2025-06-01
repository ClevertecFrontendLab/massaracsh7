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
import { INGREDIENTS_HELPER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { Unit } from '~/types/apiTypes';
import { getFocusStyles } from '~/utils/getFocusStyles';

type RecipeIngredientsProps = {
    ingredientFields: FieldArrayWithId<CreateRecipeInput, 'ingredients', 'id'>[];
    register: UseFormRegister<CreateRecipeInput>;
    control: Control<CreateRecipeInput>;
    errors: FieldErrors<CreateRecipeInput>;
    appendIngredient: UseFieldArrayAppend<CreateRecipeInput, 'ingredients'>;
    removeIngredient: UseFieldArrayRemove;
    unitData?: Unit[];
};

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
                <Text textStyle='formBoldText'>{INGREDIENTS_HELPER}</Text>
                <ButtonPlusWhite />
            </HStack>

            <Grid
                display={{
                    base: 'none',
                    sm: 'none',
                    smPlus: 'none',
                    md: 'grid',
                    lg: 'grid',
                    xl: 'grid',
                }}
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
                    gap={{ base: 3, sm: 3, md: 4, lg: 4, xl: 4 }}
                    templateColumns={{
                        base: '80px 192px 32px',
                        sm: '80px 192px 32px',
                        md: '241px 80px 215px 32px',
                        lg: '295px 80px 215px 32px',
                        xl: '295px 80px 215px 32px',
                    }}
                    templateRows={{ base: 'auto auto', sm: 'auto auto', md: 'auto', xl: 'auto' }}
                >
                    <FormControl
                        isInvalid={!!errors.ingredients?.[index]?.title}
                        gridColumn={{ base: '1 / -1', sm: '1 / -1', md: 'auto' }}
                        gridRow={{ base: '1', sm: '1', md: 'auto' }}
                    >
                        <Input
                            variant='recipe'
                            placeholder='Ингредиент'
                            {...register(`ingredients.${index}.title`)}
                            data-test-id={TEST_IDS.RECIPE_INGREDIENTS_TITLE(index)}
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
                                        data-test-id={TEST_IDS.RECIPE_INGREDIENTS_COUNT(index)}
                                        _focus={getFocusStyles({
                                            hasError: !!errors.ingredients?.[index]?.count,
                                        })}
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
                                    data-test-id={TEST_IDS.RECIPE_INGREDIENTS_MEASURE_UNIT(index)}
                                    _focus={getFocusStyles({
                                        hasError: !!errors.ingredients?.[index]?.measureUnit,
                                    })}
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
                            data-test-id={TEST_IDS.RECIPE_INGREDIENTS_ADD}
                            icon={<ButtonPlusLg w='32px' h='32px' />}
                        />
                    ) : (
                        <IconButton
                            aria-label='Удалить ингредиент'
                            icon={<DeleteIcon />}
                            colorScheme='customLime'
                            variant='ghost'
                            onClick={() => removeIngredient(index)}
                            data-test-id={TEST_IDS.RECIPE_INGREDIENTS_REMOVE(index)}
                        />
                    )}
                </SimpleGrid>
            ))}
        </Stack>
    </Stack>
);
