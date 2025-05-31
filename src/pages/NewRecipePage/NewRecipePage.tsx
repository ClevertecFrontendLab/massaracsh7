import {
    Box,
    Button,
    Flex,
    FormControl,
    HStack,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { LeftPen } from '~/assets/icons/icons';
import { ImageBlock } from '~/components/RecipeForm/ImageBlock';
import { PortionsInput } from '~/components/RecipeForm/PortionsInput';
import { RecipeDescriptionInput } from '~/components/RecipeForm/RecipeDescriptionInput';
import { RecipeIngredients } from '~/components/RecipeForm/RecipeIngredients';
import { RecipeSteps } from '~/components/RecipeForm/RecipeSteps';
import { RecipeTitleInput } from '~/components/RecipeForm/RecipeTitleInput';
import { TimeInput } from '~/components/RecipeForm/TimeInput';
import { SearchableSelect } from '~/components/SearchableSelect/SearchableSelect';
import { API_RESULTS } from '~/constants/api-results';
import { CATEGORY_HELPER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { useExitBlocker } from '~/hooks/useExitBlocker';
import { useGetCategory } from '~/hooks/useGetCategory';
import { useGetSubcategory } from '~/hooks/useGetSubcategory';
import { useRecipeReset } from '~/hooks/useRecipeReset';
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
import { createMaps } from '~/utils/createMaps';

import { ExitConfirmModal } from '../../components/RecipeForm/ExitConfirmModal';
import { ImageUploadModal } from '../../components/RecipeForm/ImageUploadModal';
import {
    createOrUpdateRecipeSchema,
    CreateRecipeInput,
} from '../../components/RecipeForm/RecipeSchema';

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

    const { titleToIdMap, idToTitleMap } = createMaps(subCats);

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

    useRecipeReset(recipe, reset);

    const watchedCategories = watch('categoriesIds');
    const rootCategories = useGetCategory(watchedCategories);
    const subCategories = useGetSubcategory(watchedCategories);
    const { isOpen: isExitOpen, onOpen: openExit, onClose: closeExit } = useDisclosure();

    const { handleExit } = useExitBlocker(isDirty, canExit, openExit, closeExit);

    const handleModalExit = () => {
        reset();
        handleExit();
    };

    const handleCloseButton = () => {
        closeExit();
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
                        title: API_RESULTS.RECIPE_SUCCESS,
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
                        title: API_RESULTS.RECIPE_SUCCESS,
                        sourse: 'global',
                    }),
                );
            }
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            const status = fetchErr?.status;
            if (status === 409) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_RECIPE_DUBLE,
                    }),
                );
            } else if (String(status).startsWith('5')) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_RECIPE_SERVER,
                    }),
                );
            }
        }
    };

    const handleSaveDraft = async (fromModal = false) => {
        clearErrors();
        const isValidTitle = await trigger('title');
        if (!isValidTitle) {
            if (fromModal) {
                closeExit();
            }
            return;
        }
        const data = getValues();
        const json = JSON.stringify(data, (_key, v) => (v === '' ? undefined : v));
        const dataToSend = JSON.parse(json) as RecipeDraftDto;
        try {
            await createRecipeDraft(dataToSend).unwrap();
            if (fromModal) {
                handleExit();
            } else {
                navigate(ROUTES_PATH.HOME);
            }

            dispatch(
                setAppAlert({
                    type: 'success',
                    title: API_RESULTS.DRAFT_SUCCESS,
                    sourse: 'global',
                }),
            );
        } catch (err) {
            const fetchErr = err as FetchBaseQueryError;
            const status = fetchErr?.status;

            if (status === 409) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_RECIPE_DUBLE,
                    }),
                );
            } else {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_DRAFT_SERVER,
                    }),
                );
            }

            if (fromModal) {
                closeExit();
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

    return (
        <>
            <Box as='form' onSubmit={handleSubmit(onSubmit)} data-test-id={TEST_IDS.RECIPE_FORM}>
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
                        <ImageBlock
                            image={getValues('image')}
                            error={!!errors.image}
                            onClick={() => handleImageClick(null)}
                        />
                        <Stack maxWidth='668px' w='100%' spacing={{ base: 4, xl: 6 }}>
                            <FormControl>
                                <Controller
                                    control={control}
                                    name='categoriesIds'
                                    render={({ field }) => (
                                        <HStack justify='space-between' width='100%'>
                                            <Text textStyle='formBoldText'>{CATEGORY_HELPER}</Text>
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

                            <RecipeTitleInput register={register} error={!!errors.title} />

                            <RecipeDescriptionInput
                                register={register}
                                error={!!errors.description}
                            />

                            <PortionsInput control={control} error={!!errors.portions} />

                            <TimeInput control={control} error={!!errors.time} />
                        </Stack>
                    </Flex>
                    <RecipeIngredients
                        ingredientFields={ingredientFields}
                        register={register}
                        control={control}
                        errors={errors}
                        appendIngredient={appendIngredient}
                        removeIngredient={removeIngredient}
                        unitData={unitData}
                    />
                    <RecipeSteps
                        stepFields={stepFields}
                        register={register}
                        errors={errors}
                        appendStep={appendStep}
                        removeStep={removeStep}
                        getValues={getValues}
                        handleImageClick={handleImageClick}
                    />

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
                            onClick={() => handleSaveDraft(false)}
                            data-test-id={TEST_IDS.RECIPE_SAVE_DRAFT_BUTTON}
                        >
                            Сохранить черновик
                        </Button>
                        <Button
                            size='lg'
                            bg='black'
                            color='white'
                            type='submit'
                            data-test-id={TEST_IDS.RECIPE_PUBLISH_RECIPE_BUTTON}
                        >
                            {isEditMode ? 'Редактировать рецепт' : 'Опубликовать рецепт'}
                        </Button>
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
                onExit={handleModalExit}
                onSaveDraft={() => handleSaveDraft(true)}
            />
        </>
    );
};
