import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { SearchableSelect } from '~/components/SearchableSelect/SearchableSelect';
import { useCreateRecipeMutation } from '~/query/services/recipes';
import { CreateRecipeDto } from '~/types/apiTypes';

export const NewRecipePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<CreateRecipeDto>({
        defaultValues: {
            title: '',
            description: '',
            portions: 1,
            time: 1,
            categoriesIds: [],
            ingredients: [{ title: '', count: 1, measureUnit: '' }],
            steps: [{ description: '' }],
        },
    });

    const { fields: ingredientFields, append: appendIngredient } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const { fields: stepFields, append: appendStep } = useFieldArray({
        control,
        name: 'steps',
    });

    const [createRecipe] = useCreateRecipeMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: CreateRecipeDto) => {
        try {
            if (data.categoriesIds.length < 3) {
                alert('Нужно выбрать минимум 3 категории');
                return;
            }
            const response = await createRecipe(data).unwrap();
            navigate(`/recipe/${response._id}`);
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            console.error('Ошибка при создании рецепта:', fetchErr.status);
        }
    };

    return (
        <Box as='form' onSubmit={handleSubmit(onSubmit)} pt={6} mb={10}>
            <Flex flexDirection='column' gap={6}>
                <FormControl isInvalid={!!errors.image}>
                    <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setValue(`image`, reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                    <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.title}>
                    <Input
                        placeholder='Название рецепта'
                        {...register('title', {
                            required: 'Название обязательно',
                            maxLength: { value: 50, message: 'Макс. 50 символов' },
                        })}
                    />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                    <Textarea
                        placeholder='Описание'
                        {...register('description', {
                            required: 'Описание обязательно',
                            maxLength: { value: 500, message: 'Макс. 500 символов' },
                        })}
                    />
                    <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.portions}>
                    <HStack>
                        <Text>Порций:</Text>
                        <NumberInput
                            min={1}
                            maxW={90}
                            onChange={(val) => setValue('portions', Number(val))}
                        >
                            <NumberInputField
                                {...register('portions', { required: true, min: 1 })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.time}>
                    <HStack>
                        <Text>Время (мин):</Text>
                        <NumberInput
                            min={1}
                            max={10000}
                            maxW={120}
                            onChange={(val) => setValue('time', Number(val))}
                        >
                            <NumberInputField
                                {...register('time', {
                                    required: true,
                                    min: 1,
                                    max: 10000,
                                })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.categoriesIds}>
                    <Controller
                        control={control}
                        name='categoriesIds'
                        rules={{
                            validate: (value) =>
                                value.length >= 3 || 'Выберите минимум 3 категории',
                        }}
                        render={({ field }) => (
                            <SearchableSelect
                                label='Категория'
                                options={[
                                    'Завтрак',
                                    'Ужин',
                                    'Обед',
                                    'Супы',
                                    'Десерты',
                                    'Веганская кухня',
                                    'ПП',
                                    'Гриль',
                                ]}
                                selectedValues={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <FormErrorMessage>{errors.categoriesIds?.message}</FormErrorMessage>
                </FormControl>
                <Box>
                    <Text fontWeight='bold' mb={2}>
                        Ингредиенты
                    </Text>
                    {ingredientFields.map((field, index) => (
                        <HStack key={field.id} mb={2}>
                            <FormControl isInvalid={!!errors.ingredients?.[index]?.title}>
                                <Input
                                    placeholder='Название'
                                    {...register(`ingredients.${index}.title`, {
                                        required: true,
                                        maxLength: 50,
                                    })}
                                />
                            </FormControl>
                            <FormControl isInvalid={!!errors.ingredients?.[index]?.count}>
                                <NumberInput
                                    min={1}
                                    maxW={90}
                                    onChange={(val) =>
                                        setValue(`ingredients.${index}.count`, Number(val))
                                    }
                                >
                                    <NumberInputField
                                        {...register(`ingredients.${index}.count`, {
                                            required: true,
                                            min: 1,
                                        })}
                                    />
                                </NumberInput>
                            </FormControl>
                        </HStack>
                    ))}
                    <Button
                        onClick={() => appendIngredient({ title: '', count: 1, measureUnit: '' })}
                    >
                        Добавить ингредиент
                    </Button>
                </Box>

                <Box>
                    <Text fontWeight='bold' mb={2}>
                        Шаги приготовления
                    </Text>
                    {stepFields.map((field, index) => (
                        <Box key={field.id} mb={4} p={3} borderWidth='1px' borderRadius='md'>
                            <Text fontWeight='bold' mb={2}>
                                Шаг {index + 1}
                            </Text>

                            <FormControl isInvalid={!!errors.steps?.[index]?.description} mb={2}>
                                <Textarea
                                    placeholder='Описание шага'
                                    {...register(`steps.${index}.description`, {
                                        required: 'Описание обязательно',
                                        maxLength: 300,
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.steps?.[index]?.description?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.steps?.[index]?.image}>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setValue(
                                                `steps.${index}.image`,
                                                reader.result as string,
                                            );
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                />
                                <FormErrorMessage>
                                    {errors.steps?.[index]?.image?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <input
                                type='hidden'
                                {...register(`steps.${index}.stepNumber`)}
                                value={index + 1}
                            />
                        </Box>
                    ))}
                    <Button
                        onClick={() =>
                            appendStep({
                                stepNumber: stepFields.length + 1,
                                description: '',
                                image: '',
                            })
                        }
                    >
                        Добавить шаг
                    </Button>
                </Box>

                <HStack>
                    <Button type='submit' colorScheme='gray'>
                        Сохранить черновик
                    </Button>
                    <Button type='submit' colorScheme='green'>
                        Опубликовать рецепт
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
};
