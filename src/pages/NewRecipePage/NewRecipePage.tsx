import { DeleteIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    Grid,
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
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { BlockerFunction, useBlocker, useNavigate, useParams } from 'react-router';

import {
    ButtonPlus,
    ButtonPlusLg,
    ButtonPlusWhite,
    ImagePlaceholder,
    LeftPen,
} from '~/assets/icons/icons';
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
            <Box as='form' onSubmit={handleSubmit(onSubmit)} data-test-id='recipe-form'>
                <Stack mt={{ base: 0, xl: 6 }} spacing={{ base: '32px', xl: '40px' }}>
                    <Flex
                        gap={{ base: 4, xl: 6 }}
                        flexDirection={{
                            base: 'row',
                            sm: 'column',
                            md: 'row',
                            lg: 'row',
                            xl: 'row',
                        }}
                    >
                        <FormControl isInvalid={!!errors.image} w='auto'>
                            <Box
                                h={{ sm: '224px', md: '224px', lg: '410px', xl: '410px' }}
                                w={{ sm: '232px', md: '328px', lg: '553px', xl: '553px' }}
                                bg='gray.100'
                                borderRadius='md'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                overflow='hidden'
                                cursor='pointer'
                                onClick={() => handleImageClick(null)}
                                _hover={{ bg: 'gray.200' }}
                                border={errors.image ? '1px solid' : '1px solid transparent'}
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
                                    <ImagePlaceholder w='32px' h='32px' />
                                )}
                            </Box>
                        </FormControl>
                        <Stack maxWidth='668px' w='100%' spacing={{ base: 4, xl: 6 }}>
                            <FormControl>
                                <Controller
                                    control={control}
                                    name='categoriesIds'
                                    render={({ field }) => (
                                        <HStack justify='space-between' width='100%'>
                                            <Text textStyle='formBoldText'>
                                                Выберите не менее 3-х тегов
                                            </Text>
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
                            </FormControl>

                            <FormControl isInvalid={!!errors.title}>
                                <Input
                                    variant='recipetitle'
                                    placeholder='Название рецепта'
                                    {...register('title')}
                                    data-test-id='recipe-title'
                                    // _focus={{
                                    //     borderColor: errors.title ? 'red.500' : 'customLime.150',
                                    //     boxShadow: errors.title ? '0 0 0 1px red.500' : '0 0 0 1px customLime.150',
                                    // }}
                                />
                            </FormControl>

                            <FormControl isInvalid={!!errors.description}>
                                <Textarea
                                    variant='recipe-descr'
                                    placeholder='Описание'
                                    {...register('description')}
                                    data-test-id='recipe-description'
                                    // _focus={{
                                    //     borderColor: errors.description ? 'red.500' : 'customLime.150',
                                    //     boxShadow: errors.description ? '0 0 0 1px red.500' : '0 0 0 1px customLime.150',
                                    // }}
                                />
                            </FormControl>

                            <FormControl isInvalid={!!errors.portions}>
                                <Controller
                                    control={control}
                                    name='portions'
                                    render={({ field }) => (
                                        <HStack gap={6}>
                                            <Text textStyle='formBoldText'>
                                                На сколько человек ваш рецепт?
                                            </Text>
                                            <NumberInput
                                                max={1000}
                                                w={90}
                                                variant='recipe'
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
                                                    borderColor={
                                                        errors.portions ? 'red.500' : 'inherit'
                                                    }
                                                    _focus={{
                                                        borderColor: errors.portions
                                                            ? 'red.500'
                                                            : 'customLime.150',
                                                        boxShadow: errors.portions
                                                            ? '0 0 0 1px red'
                                                            : '0 0 0 1px customLime.150',
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
                                <HStack gap={6}>
                                    <Text textStyle='formBoldText'>
                                        Сколько времени готовить в минутах?
                                    </Text>
                                    <Controller
                                        name='time'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <NumberInput
                                                max={10000}
                                                value={value || undefined}
                                                onChange={(_, valueAsNumber) =>
                                                    onChange(valueAsNumber)
                                                }
                                                w={90}
                                                variant='recipe'
                                                data-test-id='recipe-time'
                                            >
                                                <NumberInputField
                                                    data-test-id='recipe-time'
                                                    borderWidth={errors.time ? '1px' : '1px'}
                                                    borderColor={
                                                        errors.time ? 'red.500' : 'inherit'
                                                    }
                                                    _focus={{
                                                        borderColor: errors.time
                                                            ? 'red.500'
                                                            : 'customLime.150',
                                                        boxShadow: errors.time
                                                            ? '0 0 0 1px red.500'
                                                            : '0 0 0 1px customLime.150',
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
                        </Stack>
                    </Flex>
                    <Stack maxW={{ base: '606px', xl: '668px' }} w='100%' m='0 auto'>
                        <Stack spacing={{ base: 3, xl: 4 }} mb={10}>
                            <HStack spacing={2} mb={4}>
                                <Text textStyle='formBoldText'>
                                    Добавьте ингредиенты рецепта, нажав на
                                </Text>
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
                                            // _focus={{
                                            //     borderColor: errors.ingredients?.[index]?.title ? 'red.500' : 'customLime.150',
                                            //     boxShadow: errors.ingredients?.[index]?.title ? '0 0 0 1px red.500' : '',
                                            // }}
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
                                                >
                                                    <NumberInputField
                                                        placeholder='100'
                                                        data-test-id={`recipe-ingredients-count-${index}`}
                                                        _focus={{
                                                            borderColor: errors.ingredients?.[index]
                                                                ?.count
                                                                ? 'red.500'
                                                                : 'customLime.150',
                                                            boxShadow: errors.ingredients?.[index]
                                                                ?.count
                                                                ? '0 0 0 1px red.500'
                                                                : '0 0 0 1px customLime.150',
                                                        }}
                                                    />
                                                </NumberInput>
                                            )}
                                        />
                                    </FormControl>

                                    <FormControl
                                        isInvalid={!!errors.ingredients?.[index]?.measureUnit}
                                    >
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
                                                        borderColor: errors.ingredients?.[index]
                                                            ?.count
                                                            ? 'red.500'
                                                            : 'customLime.150',
                                                        boxShadow: errors.ingredients?.[index]
                                                            ?.count
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
                                                appendIngredient({
                                                    title: '',
                                                    count: 1,
                                                    measureUnit: '',
                                                })
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
                        <Box mb={10}>
                            <Text textStyle='formBoldText' mb={4}>
                                Добавьте шаги приготовления
                            </Text>
                            {stepFields.map((field, index) => (
                                <Stack
                                    key={field.id}
                                    border='1px solid'
                                    borderColor='blackAlpha.200'
                                    borderRadius={12}
                                    mb={4}
                                    h={{ sm: 'auto', md: '180px', lg: '180px', xl: '180px' }}
                                    flexDir={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
                                >
                                    <Box
                                        h={{ sm: '160px', md: '100%', lg: '100%', xl: '100%' }}
                                        w={{ sm: '328px', md: '346px', lg: '346px', xl: '346px' }}
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
                                            <ImagePlaceholder w='32px' h='32px' />
                                        )}
                                    </Box>
                                    <VStack
                                        p={5}
                                        gap={4}
                                        w={{ sm: '328px', md: '258px', lg: '312px', xl: '322px' }}
                                    >
                                        <Flex
                                            justifyContent='space-between'
                                            alignItems='center'
                                            width='100%'
                                        >
                                            <Badge
                                                variant='gray06'
                                                textTransform='capitalize'
                                                fontWeight='600'
                                            >
                                                Шаг {index + 1}
                                            </Badge>

                                            {index !== 0 && (
                                                <IconButton
                                                    aria-label='Удалить шаг'
                                                    icon={<DeleteIcon />}
                                                    colorScheme='customLime'
                                                    variant='ghost'
                                                    onClick={() => removeStep(index)}
                                                    data-test-id={`recipe-steps-remove-button-${index}`}
                                                    w='14px'
                                                    h='14px'
                                                />
                                            )}
                                        </Flex>
                                        <FormControl
                                            isInvalid={!!errors.steps?.[index]?.description}
                                        >
                                            <Textarea
                                                placeholder='Описание шага'
                                                {...register(`steps.${index}.description`)}
                                                data-test-id={`recipe-steps-description-${index}`}
                                                fontSize='14px'
                                                lineHeight='20px'
                                                h={{
                                                    sm: 'auto',
                                                    md: '104px',
                                                    lg: '104px',
                                                    xl: '104px',
                                                }}
                                                _focus={{
                                                    borderColor: errors.time
                                                        ? 'red.500'
                                                        : 'customLime.150',
                                                    boxShadow: errors.time
                                                        ? '0 0 0 1px red'
                                                        : '0 0 0 1px customLime.150',
                                                }}
                                            />
                                        </FormControl>
                                    </VStack>
                                </Stack>
                            ))}
                            <Flex justifyContent='flex-end' mt={4}>
                                <Button
                                    type='button'
                                    variant='outline'
                                    borderColor='black'
                                    rightIcon={<ButtonPlus />}
                                    onClick={() =>
                                        appendStep({
                                            stepNumber: stepFields.length + 1,
                                            description: '',
                                            image: null,
                                        })
                                    }
                                    size='sm'
                                >
                                    Новый шаг
                                </Button>
                            </Flex>
                        </Box>

                        <Stack
                            justifyContent='center'
                            gap={5}
                            flexDirection={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
                        >
                            <Button
                                size='lg'
                                colorScheme='black'
                                variant='outline'
                                type='button'
                                leftIcon={<LeftPen />}
                                onClick={handleSaveDraft}
                                data-test-id='recipe-save-draft-button'
                            >
                                Сохранить черновик
                            </Button>
                            <Button
                                size='lg'
                                bg='black'
                                color='white'
                                type='submit'
                                data-test-id='recipe-publish-recipe-button'
                            >
                                {isEditMode ? 'Редактировать рецепт' : 'Опубликовать рецепт'}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
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
