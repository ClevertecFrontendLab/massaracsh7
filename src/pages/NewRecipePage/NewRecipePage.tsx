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

import { ButtonPlus, ButtonPlusLg, ButtonPlusWhite } from '~/assets/icons/icons';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
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
import { createOrUpdateRecipeSchema, CreateRecipeInput } from './RecipeSchema';

export const NewRecipePage = () => {
    const { category, subcategory, id } = useParams();

    const isEditMode = Boolean(id);
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const { data: recipe } = useGetRecipeByIdQuery(id!, {
        skip: !isEditMode,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();
    const [createRecipeDraft] = useCreateRecipeDraftMutation();
    const { data: unitData } = useGetMeasureUnitsQuery();
    const navigate = useNavigate();
    console.log(currentStepIndex);
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
        clearErrors,
        trigger,
    } = useForm<CreateRecipeInput>({
        resolver: zodResolver(createOrUpdateRecipeSchema),
        mode: 'onSubmit',
        defaultValues: {
            title: undefined,
            description: undefined,
            portions: undefined,
            time: undefined,
            categoriesIds: [],
            ingredients: [{ title: undefined, count: undefined, measureUnit: undefined }],
            steps: [{ description: undefined, stepNumber: 1, image: null }],
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
                title: recipe.title ?? undefined,
                description: recipe.description ?? undefined,
                portions: recipe.portions ?? undefined,
                time: recipe.time ?? undefined,
                categoriesIds: recipe.categoriesIds ?? [],
                ingredients: recipe.ingredients.length
                    ? recipe.ingredients
                    : [{ title: undefined, count: undefined, measureUnit: undefined }],
                steps: recipe.steps.length
                    ? recipe.steps.map((step, index) => ({ ...step, stepNumber: index + 1 }))
                    : [{ description: undefined, stepNumber: 1, image: null }],
                image: recipe.image ?? undefined,
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
        reset();
        closeExit();
        blocker.proceed?.();
    };

    // const handleStay = () => {
    //     closeExit();
    //     blocker.reset?.();
    // };

    const handleCloseButton = () => {
        closeExit();
    };

    const handleDraftModal = () => {
        closeExit();
        handleSaveDraft();
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
                        title: 'Рецепт успешно опубликован',
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
        clearErrors('title');
        const isValidTitle = await trigger('title');
        if (!isValidTitle) {
            return;
        }
        const data = getValues();
        const json = JSON.stringify(data, (_key, v) => (v === '' ? undefined : v));
        const dataToSend = JSON.parse(json) as RecipeDraftDto;

        try {
            await createRecipeDraft(dataToSend).unwrap();
            // dispatch(
            //     setAppAlert({
            //         type: 'success',
            //         title: 'Черновик успешно сохранён',
            //         sourse: 'global',
            //     }),
            // );
            setCanExit(true);
            navigate('/', {
                replace: true,
                state: {
                    showSuccessDraftAlert: true,
                },
            });
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            const status = fetchErr?.status;

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
                        message: 'Не удалось сохранить черновик рецепта',
                    }),
                );
            }
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

    if (isCreating) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    return (
        <>
            <Box
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                pt={6}
                mb={10}
                data-test-id='recipe-form'
            >
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
                            data-test-id='recipe-image-block'
                        >
                            {getValues('image') ? (
                                <Image
                                    src={`${BASE_IMG_URL}${getValues('image')}`}
                                    alt='Изображение рецепта'
                                    objectFit='cover'
                                    w='100%'
                                    h='100%'
                                    data-test-id='recipe-image-block-preview-image'
                                />
                            ) : (
                                <Text color='gray.500'>Нажмите, чтобы загрузить</Text>
                            )}
                        </Box>
                    </FormControl>

                    <FormControl isInvalid={!!errors.title}>
                        <Input
                            placeholder='Название рецепта'
                            {...register('title')}
                            data-test-id='recipe-title'
                            _focus={{
                                borderColor: errors.title ? 'red.500' : '',
                                boxShadow: errors.title ? '0 0 0 1px red.500' : '',
                            }}
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.description}>
                        <Textarea
                            placeholder='Описание'
                            {...register('description')}
                            data-test-id='recipe-description'
                            _focus={{
                                borderColor: errors.description ? 'red.500' : '',
                                boxShadow: errors.description ? '0 0 0 1px red.500' : '',
                            }}
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.portions} mt={4}>
                        <Controller
                            control={control}
                            name='portions'
                            render={({ field }) => (
                                <HStack>
                                    <Text>На сколько человек ваш рецепт?</Text>
                                    <NumberInput
                                        max={1000}
                                        maxW={100}
                                        value={field.value ?? ''}
                                        onChange={(valueString, valueAsNumber) => {
                                            if (valueString === '-' || valueString === '') {
                                                field.onChange(valueString);
                                            } else if (!isNaN(valueAsNumber)) {
                                                field.onChange(valueAsNumber);
                                            }
                                        }}
                                    >
                                        <NumberInputField
                                            data-test-id='recipe-portions'
                                            borderWidth={errors.portions ? '1px' : '1px'}
                                            borderColor={errors.portions ? 'red.500' : 'inherit'}
                                            _focus={{
                                                borderColor: errors.portions
                                                    ? 'red.500'
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
                        <Text mb={2}>Сколько времени готовить в минутах?</Text>
                        <Controller
                            name='time'
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <NumberInput
                                    max={10000}
                                    value={value || undefined}
                                    onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
                                    maxW={120}
                                >
                                    <NumberInputField
                                        data-test-id='recipe-time'
                                        placeholder='Время'
                                        borderWidth={errors.time ? '2px' : '1px'}
                                        borderColor={errors.time ? 'red.500' : 'inherit'}
                                        _focus={{
                                            borderColor: errors.time ? 'red.500' : 'blue.500',
                                            boxShadow: errors.time
                                                ? '0 0 0 1px red'
                                                : '0 0 0 1px blue',
                                        }}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            )}
                        />
                    </FormControl>

                    <FormControl>
                        <Box borderRadius='md' p={1}>
                            <Controller
                                control={control}
                                name='categoriesIds'
                                render={({ field }) => (
                                    <HStack>
                                        <Text>Выберите не менее 3-х тегов</Text>
                                        <SearchableSelect
                                            label='Категория'
                                            options={subCats.map((cat) => cat.title)}
                                            selectedValues={field.value.map(
                                                (_id) => idToTitleMap[_id],
                                            )}
                                            onChange={(titles: string[]) =>
                                                field.onChange(
                                                    titles.map((title) => titleToIdMap[title]),
                                                )
                                            }
                                            dataId='recipe-categories'
                                            error={!!errors?.categoriesIds}
                                        />
                                    </HStack>
                                )}
                            />
                        </Box>
                    </FormControl>

                    <Box>
                        <Text fontWeight='bold' mb={2}>
                            Добавьте ингредиенты рецепта, нажав на <ButtonPlusWhite />
                        </Text>
                        <HStack mb={1} pl={1}>
                            <Text flex='2' fontWeight='semibold'>
                                Ингредиент
                            </Text>
                            <Text flex='1' fontWeight='semibold' textAlign='center'>
                                Количество
                            </Text>
                            <Text flex='1' fontWeight='semibold' textAlign='center'>
                                Единица измерения
                            </Text>
                            <Box w='40px' />
                        </HStack>
                        {ingredientFields.map((field, index) => (
                            <HStack key={field.id} mb={2}>
                                <FormControl isInvalid={!!errors.ingredients?.[index]?.title}>
                                    <Input
                                        placeholder='Ингредиент'
                                        {...register(`ingredients.${index}.title`)}
                                        data-test-id={`recipe-ingredients-title-${index}`}
                                        _focus={{
                                            borderColor: errors.ingredients?.[index]?.title
                                                ? 'red.500'
                                                : '',
                                            boxShadow: errors.ingredients?.[index]?.title
                                                ? '0 0 0 1px red.500'
                                                : '',
                                        }}
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
                                                onChange={(_, valueAsNumber) =>
                                                    onChange(valueAsNumber)
                                                }
                                                maxW={90}
                                            >
                                                <NumberInputField
                                                    placeholder='Количество'
                                                    data-test-id={`recipe-ingredients-count-${index}`}
                                                    _focus={{
                                                        borderColor: errors.ingredients?.[index]
                                                            ?.count
                                                            ? 'red.500'
                                                            : '',
                                                        boxShadow: errors.ingredients?.[index]
                                                            ?.count
                                                            ? '0 0 0 1px red.500'
                                                            : '',
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
                                                    borderColor: errors.time
                                                        ? 'red.500'
                                                        : 'blue.500',
                                                    boxShadow: errors.time
                                                        ? '0 0 0 1px red'
                                                        : '0 0 0 1px blue',
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
                                <IconButton
                                    aria-label='Удалить ингредиент'
                                    icon={<DeleteIcon />}
                                    colorScheme='green'
                                    variant='outline'
                                    onClick={() => removeIngredient(index)}
                                    data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                                />
                            </HStack>
                        ))}
                        <Button
                            type='button'
                            onClick={() =>
                                appendIngredient({ title: '', count: 1, measureUnit: '' })
                            }
                            data-test-id='recipe-ingredients-add-ingredients'
                        >
                            <ButtonPlusLg />
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
                                        data-test-id={`recipe-steps-description-${index}`}
                                        _focus={{
                                            borderColor: errors.time ? 'red.500' : 'blue.500',
                                            boxShadow: errors.time
                                                ? '0 0 0 1px red'
                                                : '0 0 0 1px blue',
                                        }}
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
                                    data-test-id={`recipe-steps-image-block-${index}`}
                                >
                                    {getValues(`steps.${index}.image`) ? (
                                        <Image
                                            src={`${BASE_IMG_URL}${getValues(`steps.${index}.image`)}`}
                                            alt={`Шаг ${index + 1}`}
                                            objectFit='cover'
                                            h='100%'
                                            data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                                        />
                                    ) : (
                                        <Text color='gray.400'>
                                            Нажмите, чтобы загрузить изображение
                                        </Text>
                                    )}
                                </Box>
                                {index !== 0 && (
                                    <IconButton
                                        aria-label='Удалить шаг'
                                        icon={<DeleteIcon />}
                                        colorScheme='green'
                                        variant='outline'
                                        onClick={() => removeStep(index)}
                                        data-test-id={`recipe-steps-remove-button-${index}`}
                                    />
                                )}
                            </Box>
                        ))}
                        <Button
                            type='button'
                            onClick={() =>
                                appendStep({
                                    stepNumber: stepFields.length + 1,
                                    description: '',
                                    image: null,
                                })
                            }
                        >
                            Новый шаг &nbsp;
                            <ButtonPlus />
                        </Button>
                    </Box>

                    <HStack justifyContent='space-between'>
                        <Button
                            type='button'
                            colorScheme='gray'
                            onClick={handleSaveDraft}
                            data-test-id='recipe-save-draft-button'
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            type='submit'
                            colorScheme='green'
                            data-test-id='recipe-publish-recipe-button'
                        >
                            {isEditMode ? 'Редактировать рецепт' : 'Опубликовать рецепт'}
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
                stepIndex={currentStepIndex === null ? undefined : currentStepIndex}
            />

            <ExitConfirmModal
                isOpen={isExitOpen}
                onClose={handleCloseButton}
                onExit={handleExit}
                onSaveDraft={handleDraftModal}
            />
        </>
    );
};
