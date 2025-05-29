import { DeleteIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    FormControl,
    HStack,
    IconButton,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { BlockerFunction, useBlocker, useNavigate, useParams } from 'react-router';

import { SearchableSelect } from '~/components/SearchableSelect/SearchableSelect';
import { BASE_IMG_URL } from '~/constants/constants';
import { useGetCategory } from '~/hooks/useGetCategory';
import { useGetSubcategory } from '~/hooks/useGetSubcategory';
import {
    useCreateRecipeDraftMutation,
    useCreateRecipeMutation,
    useEditRecipeMutation,
    useGetMeasureUnitsQuery,
    useGetRecipeByIdQuery,
} from '~/query/services/recipes';
import { setAppAlert } from '~/store/app-slice';
import { selectAllSubCategories } from '~/store/category-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { CreateRecipeDto, RecipeDraftDto, UpdateRecipeDto } from '~/types/apiTypes';

import { ExitConfirmModal } from './ExitConfirmModal';
import { ImageUploadModal } from './ImageUploadModal';
import { createOrUpdateRecipeSchema, CreateRecipeInput, draftRecipeSchema } from './RecipeSchema';

export const NewRecipePage = () => {
    const { category, subcategory, id } = useParams();

    const isEditMode = Boolean(id);
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const { data: recipe } = useGetRecipeByIdQuery(id!, {
        skip: !isEditMode,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [createRecipe] = useCreateRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();
    const { data: unitData } = useGetMeasureUnitsQuery();
    const navigate = useNavigate();

    const subCats = useAppSelector(selectAllSubCategories);
    const [canExit, setCanExit] = useState(false);

    const titleToIdMap = Object.fromEntries(subCats.map((c) => [c.title, c._id]));
    const idToTitleMap = Object.fromEntries(subCats.map((c) => [c._id, c.title]));

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        control,
        getValues,
        watch,
        reset,
    } = useForm<CreateRecipeInput>({
        resolver: zodResolver(createOrUpdateRecipeSchema),
        mode: 'onSubmit',
        defaultValues: {
            title: undefined,
            description: undefined,
            portions: 1,
            time: 1,
            categoriesIds: [],
            ingredients: [{ title: undefined, count: 1, measureUnit: undefined }],
            steps: [{ description: undefined, stepNumber: 1, image: undefined }],
            image: undefined,
        },
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const {
        fields: stepFields,
        append: appendStep,
        remove: removeStep,
    } = useFieldArray({
        control,
        name: 'steps',
    });

    useEffect(() => {
        if (recipe) {
            reset({
                title: recipe.title,
                description: recipe.description,
                portions: recipe.portions,
                time: recipe.time,
                categoriesIds: recipe.categoriesIds || [],
                ingredients: recipe.ingredients.length
                    ? recipe.ingredients
                    : [{ title: undefined, count: 1, measureUnit: undefined }],
                steps: recipe.steps.length
                    ? recipe.steps.map((step, index) => ({ ...step, stepNumber: index + 1 }))
                    : [{ description: undefined, stepNumber: 1, image: undefined }],
                image: recipe.image || undefined,
            });
        }
    }, [recipe, reset]);

    const watchedCategories = watch('categoriesIds');
    const rootCategories = useGetCategory(watchedCategories);
    const subCategories = useGetSubcategory(watchedCategories);
    const { isOpen: isExitOpen, onOpen: openExit, onClose: closeExit } = useDisclosure();

    const shouldBlock = useCallback<BlockerFunction>(() => !canExit && isDirty, [canExit, isDirty]);
    const blocker = useBlocker(shouldBlock);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            if (canExit) {
                blocker.proceed?.();
            } else {
                openExit();
            }
        }
    }, [blocker.state, blocker.location, openExit, blocker, canExit]);

    const handleExit = () => {
        closeExit();
        blocker.proceed?.();
    };

    const handleStay = () => {
        closeExit();
        blocker.reset?.();
    };

    const onSubmit = async (data: CreateRecipeInput) => {
        try {
            let response;

            if (isEditMode && id) {
                response = await editRecipe({ id, data: data as UpdateRecipeDto }).unwrap();
                setCanExit(true);
                reset(data);
                navigate(`/${category}/${subcategory}/${id}`);
                dispatch(
                    setAppAlert({
                        type: 'success',
                        title: 'Рецепт успешно обновлен',
                        sourse: 'global',
                    }),
                );
            } else {
                response = await createRecipe(data as CreateRecipeDto).unwrap();
                setCanExit(true);
                reset(data);
                navigate(
                    rootCategories?.[0]?.category && subCategories?.[0]?.category && response?._id
                        ? `/${rootCategories[0].category}/${subCategories[0].category}/${response._id}`
                        : '#',
                );
                dispatch(
                    setAppAlert({
                        type: 'success',
                        title: 'Рецепт успешно опубликован',
                        sourse: 'global',
                    }),
                );
            }
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            const status = fetchErr?.status;

            console.error('Ошибка при создании рецепта:', fetchErr.status);
            if (status === 409) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка',
                        sourse: 'global',
                        message: 'Рецепт с таким названием уже существует',
                    }),
                );
            } else if (String(status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка сервера',
                        sourse: 'global',
                        message: 'Попробуйте пока сохранить в черновик',
                    }),
                );
            }
        }
    };

    const handleSaveDraft = async () => {
        const data = getValues();
        const result = draftRecipeSchema.safeParse(data);
        try {
            await createRecipeDraft(result.data as RecipeDraftDto).unwrap();
            setCanExit(true);
            dispatch(
                setAppAlert({
                    type: 'success',
                    title: 'Черновик успешно сохранён',
                    sourse: 'global',
                }),
            );
        } catch (err) {
            console.error('Ошибка сохранения черновика:', err);
            dispatch(
                setAppAlert({
                    type: 'error',
                    title: 'Ошибка',
                    sourse: 'global',
                    message: 'Не удалось сохранить черновик, попробуйте ещё раз',
                }),
            );
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
                    <FormControl isInvalid={!!errors.image}>
                        <Box
                            w='full'
                            h='200px'
                            bg='gray.100'
                            borderRadius='md'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            overflow='hidden'
                            cursor='pointer'
                            onClick={() => handleImageClick(null)}
                            _hover={{ bg: 'gray.200' }}
                            border={errors.image ? '2px solid' : '2px solid transparent'}
                            borderColor={errors.image ? 'red.500' : 'transparent'}
                        >
                            {getValues('image') ? (
                                <Image
                                    src={`${BASE_IMG_URL}${getValues('image')}`}
                                    alt='Изображение рецепта'
                                    objectFit='cover'
                                    w='100%'
                                    h='100%'
                                />
                            ) : (
                                <Text color='gray.500'>Нажмите, чтобы загрузить</Text>
                            )}
                        </Box>
                    </FormControl>

                    <FormControl isInvalid={!!errors.title}>
                        <Input placeholder='Название рецепта' {...register('title')} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.description}>
                        <Textarea placeholder='Описание' {...register('description')} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.portions}>
                        <Controller
                            control={control}
                            name='portions'
                            render={({ field }) => (
                                <HStack>
                                    <Text>Порций:</Text>
                                    <NumberInput
                                        min={1}
                                        max={100}
                                        maxW={100}
                                        value={field.value}
                                        onChange={(_, valueAsNumber) =>
                                            field.onChange(valueAsNumber)
                                        }
                                    >
                                        <NumberInputField
                                            borderWidth={errors.portions ? '2px' : '1px'}
                                            borderColor={errors.portions ? 'red.500' : 'inherit'}
                                            _focus={{
                                                borderColor: errors.portions
                                                    ? 'red.600'
                                                    : 'blue.500',
                                                boxShadow: errors.portions
                                                    ? '0 0 0 1px red'
                                                    : '0 0 0 1px blue',
                                            }}
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

                    <FormControl isInvalid={!!errors.time} mt={4}>
                        <Controller
                            control={control}
                            name='time'
                            render={({ field }) => (
                                <HStack>
                                    <Text>Время (мин):</Text>
                                    <NumberInput
                                        min={1}
                                        max={10000}
                                        maxW={120}
                                        value={field.value}
                                        onChange={(_, valueAsNumber) =>
                                            field.onChange(valueAsNumber)
                                        }
                                    >
                                        <NumberInputField
                                            borderWidth={errors.portions ? '2px' : '1px'}
                                            borderColor={errors.portions ? 'red.500' : 'inherit'}
                                            _focus={{
                                                borderColor: errors.portions
                                                    ? 'red.600'
                                                    : 'blue.500',
                                                boxShadow: errors.portions
                                                    ? '0 0 0 1px red'
                                                    : '0 0 0 1px blue',
                                            }}
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

                    <FormControl>
                        <Box
                            border={errors.categoriesIds ? '2px solid' : '2px solid transparent'}
                            borderColor={errors.categoriesIds ? 'red.500' : 'transparent'}
                            borderRadius='md'
                            p={1}
                        >
                            <Controller
                                control={control}
                                name='categoriesIds'
                                render={({ field }) => (
                                    <SearchableSelect
                                        label='Категория'
                                        options={subCats.map((cat) => cat.title)}
                                        selectedValues={field.value.map((_id) => idToTitleMap[_id])}
                                        onChange={(titles: string[]) =>
                                            field.onChange(
                                                titles.map((title) => titleToIdMap[title]),
                                            )
                                        }
                                    />
                                )}
                            />
                        </Box>
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
                                        {...register(`ingredients.${index}.title`)}
                                    />
                                </FormControl>
                                <FormControl isInvalid={!!errors.ingredients?.[index]?.count}>
                                    <Controller
                                        control={control}
                                        name={`ingredients.${index}.count`}
                                        render={({ field }) => (
                                            <NumberInput
                                                min={1}
                                                maxW={90}
                                                value={field.value}
                                                onChange={(_, valueAsNumber) =>
                                                    field.onChange(valueAsNumber)
                                                }
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
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
                                                placeholder='Ед. изм.'
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value)}
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
                                <IconButton
                                    aria-label='Удалить ингредиент'
                                    icon={<DeleteIcon />}
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={() => removeIngredient(index)}
                                />
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
                                        {...register(`steps.${index}.description`)}
                                    />
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
                                            src={`${BASE_IMG_URL}${getValues(`steps.${index}.image`)}`}
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
                                <IconButton
                                    aria-label='Удалить шаг'
                                    icon={<DeleteIcon />}
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={() => removeStep(index)}
                                />
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

                    <HStack>
                        <Button type='button' colorScheme='gray' onClick={handleSaveDraft}>
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

            <ExitConfirmModal
                isOpen={isExitOpen}
                onClose={handleStay}
                onExit={handleExit}
                onSaveDraft={handleSaveDraft}
            />
        </>
    );
};
