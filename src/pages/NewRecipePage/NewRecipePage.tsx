import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { SearchableSelect } from '~/components/SearchableSelect/SearchableSelect';
import { useCreateRecipeMutation } from '~/query/services/recipes';
import { CreateRecipeDto } from '~/types/apiTypes';

import { ImageUploadModal } from './ImageUploadModal';
import { CreateRecipeInput, createRecipeSchema } from './RecipeSchema';

export const NewRecipePage = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [createRecipe] = useCreateRecipeMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        getValues,
    } = useForm<CreateRecipeInput>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            portions: 1,
            time: 1,
            categoriesIds: [],
            ingredients: [{ title: '', count: 1, measureUnit: '' }],
            steps: [{ description: '', stepNumber: 1, image: '' }],
            image: '',
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

    const onSubmit = async (data: CreateRecipeInput) => {
        try {
            if (data.categoriesIds.length < 3) {
                alert('Нужно выбрать минимум 3 категории');
                return;
            }
            const response = await createRecipe(data as CreateRecipeDto).unwrap();
            navigate(`/recipe/${response._id}`);
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            console.error('Ошибка при создании рецепта:', fetchErr.status);
        }
    };

    const handleImageClick = (stepIndex: number | null) => {
        setCurrentStepIndex(stepIndex);
        onOpen();
    };

    const handleImageConfirm = (base64Image: string) => {
        if (currentStepIndex === null) {
            setValue('image', base64Image);
        } else {
            setValue(`steps.${currentStepIndex}.image`, base64Image);
        }
        onClose();
    };

    return (
        <>
            <Box as='form' onSubmit={handleSubmit(onSubmit)} pt={6} mb={10}>
                <Flex flexDirection='column' gap={6}>
                    <Box>
                        <Text fontWeight='bold' mb={2}>
                            Изображение рецепта
                        </Text>
                        <Box
                            w='full'
                            h='200px'
                            bg='gray.200'
                            borderRadius='md'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            onClick={() => handleImageClick(null)}
                        >
                            {getValues('image') ? (
                                <Image
                                    src={getValues('image')}
                                    alt='Предпросмотр'
                                    objectFit='cover'
                                    h='100%'
                                />
                            ) : (
                                <Text color='gray.500'>Нажмите, чтобы загрузить</Text>
                            )}
                        </Box>
                    </Box>

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
                                validate: (v) => v.length >= 3 || 'Выберите минимум 3 категории',
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
                            type='button'
                            onClick={() =>
                                appendIngredient({ title: '', count: 1, measureUnit: '' })
                            }
                        >
                            Добавить ингредиент
                        </Button>
                    </Box>

                    {/* Шаги */}
                    <Box>
                        <Text fontWeight='bold' mb={2}>
                            Шаги приготовления
                        </Text>
                        {stepFields.map((field, index) => (
                            <Box key={field.id} mb={4} p={3} borderWidth='1px' borderRadius='md'>
                                <Text fontWeight='bold' mb={2}>
                                    Шаг {index + 1}
                                </Text>
                                <FormControl
                                    isInvalid={!!errors.steps?.[index]?.description}
                                    mb={2}
                                >
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

                                <Box
                                    h='150px'
                                    bg='gray.100'
                                    borderRadius='md'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    cursor='pointer'
                                    onClick={() => handleImageClick(index)}
                                >
                                    {getValues(`steps.${index}.image`) ? (
                                        <Image
                                            src={getValues(`steps.${index}.image`)}
                                            alt={`Шаг ${index + 1}`}
                                            objectFit='cover'
                                            h='100%'
                                        />
                                    ) : (
                                        <Text color='gray.400'>
                                            Нажмите, чтобы загрузить изображение
                                        </Text>
                                    )}
                                </Box>
                            </Box>
                        ))}
                        <Button
                            type='button'
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

                    {/* Кнопки */}
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

            <ImageUploadModal
                isOpen={isOpen}
                onClose={onClose}
                initialImage={
                    currentStepIndex === null
                        ? getValues('image')
                        : getValues(`steps.${currentStepIndex}.image`)
                }
                onSave={handleImageConfirm}
            />
        </>
    );
};
