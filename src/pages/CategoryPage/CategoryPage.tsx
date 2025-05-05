import { Box, Button, Center, Heading, Spinner, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { setHasResults } from '~/store/filter-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Category, Recipe, SubCategory } from '~/types/apiTypes';
import { buildQuery } from '~/utils/buildQuery';

const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const dispatch = useAppDispatch();

    const { categories, subCategories } = useAppSelector((state) => state.categories);
    const {
        selectedAllergens,
        excludeAllergens,
        selectedSubCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useAppSelector((state) => state.filters);

    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [message, setMessage] = useState('');

    const cat = categories.find((item: Category) => item.category === category);
    const subCat = subCategories.find((item: SubCategory) => item.category === subcategory);

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(cat?._id ?? null);

    const hasFilters =
        searchTerm.length >= 3 || selectedAllergens.length > 0 || selectedMeat || selectedSide;

    const filteredParams = useMemo(
        () =>
            buildQuery({
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                limit: 8,
                page,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm, page],
    );
    const categoryParams = useMemo(
        () =>
            buildQuery({
                limit: 8,
                page,
            }),
        [page],
    );
    const queryParams = hasFilters ? filteredParams : categoryParams;

    const shouldSkipQuery = !subCat?._id && !hasFilters;

    const {
        data: recipeData,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetRecipesByCategoryQuery(
        shouldSkipQuery ? skipToken : { id: subCat?._id || '', ...queryParams },
        {
            refetchOnMountOrArgChange: true,
        },
    );
    useEffect(() => {
        if (isSuccess && recipeData?.data) {
            setRecipes((prev) => [...prev, ...recipeData.data]);
        }
    }, [isSuccess, recipeData]);

    useEffect(() => {
        recipeData &&
            dispatch(setHasResults(searchTerm.length < 3 ? null : recipeData?.data?.length > 0));
    }, [dispatch, searchTerm, recipeData]);

    useEffect(() => {
        const noFiltersOrSearch = !hasFilters;

        if (noFiltersOrSearch) {
            setMessage('');
            return;
        }

        if (recipeData?.data?.length === 0) {
            setMessage('По вашему запросу ничего не найдено. Попробуйте другой запрос');
        } else {
            setMessage('');
        }
    }, [recipeData, hasFilters]);

    useEffect(() => {
        setRecipes([]);
        setPage(1);
    }, [filteredParams, categoryParams]);

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    const isLastPage = recipeData && recipeData?.meta?.page >= recipeData?.meta?.totalPages;

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        setIsFirstLoad(true);
        setPage(1);
        setRecipes([]);
    }, [subCat?._id, hasFilters, searchTerm]);

    useEffect(() => {
        if (isSuccess) {
            setIsFirstLoad(false);
            setRecipes((prev) => [...prev, ...(recipeData?.data || [])]);
        }
    }, [isSuccess, recipeData]);

    if (isLoading && isFirstLoad) {
        return (
            <Center minH='400px'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='lime.500'
                    size='xl'
                />
            </Center>
        );
    }

    return (
        <Box>
            <Box
                boxShadow={hasFilters || excludeAllergens ? 'main' : 'none'}
                pb={8}
                mb={6}
                borderRadius='0 0 8px 8px'
                width={{ base: '100%', sm: '100%', md: '480px', lg: '578px', xl: '898px' }}
                mx='auto'
                px={{ base: '16px', sm: '16px', md: '16px', lg: '30px', xl: '190px' }}
            >
                {message ? (
                    <Heading mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>{message}</Heading>
                ) : (
                    <Heading
                        variant='pageTitle'
                        mb={{ sm: '14px', md: '14px', lg: '12px', xl: '12px' }}
                    >
                        {cat?.title}
                    </Heading>
                )}
                <Box
                    width='100%'
                    maxW='700px'
                    mx='auto'
                    mb={{ sm: '4', md: '4', lg: '8', xl: '8' }}
                >
                    <Text textAlign='center' textStyle='descriptionText'>
                        {cat?.description}
                    </Text>
                </Box>
                <SearchBar isLoader={isFetching} />
            </Box>

            <TabsCategory subcategories={cat?.subCategories ?? []} />

            {recipes && <RecipeList recipes={recipes} gridVariant='low' />}

            <Center mb={{ sm: '8', md: '8', lg: '10', xl: '9' }}>
                {isFetching && page > 1 ? (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='lime.500'
                        size='md'
                    />
                ) : (
                    !isLastPage && (
                        <Button variant='limeSolid' size='medium' onClick={loadMore}>
                            Загрузить ещё
                        </Button>
                    )
                )}
            </Center>

            <KitchenSection
                title={randomTitle}
                description={randomDescription}
                relevantRecipes={randomRecipes}
            />
        </Box>
    );
};

export default CategoryPage;
