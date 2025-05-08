import { Box, Heading, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import CustomLoader from '~/components/CustomLoader/CustomLoader';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { setHasResults } from '~/store/filter-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { buildQuery } from '~/utils/buildQuery';

const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const dispatch = useAppDispatch();

    const { categories, subCategories } = useAppSelector(
        (state: ApplicationState) => state.categories,
    );
    const {
        selectedAllergens,
        excludeAllergens,
        selectedMeat,
        selectedSide,
        searchTerm,
        isSearch,
    } = useAppSelector((state: ApplicationState) => state.filters);

    const [message, setMessage] = useState('');
    const [isFilterClose, setIsFilterClose] = useState(true);

    const cat = useMemo(
        () => categories.find((item) => item.category === category),
        [categories, category],
    );
    const subCat = useMemo(
        () => subCategories.find((item) => item.category === subcategory),
        [subCategories, subcategory],
    );

    const subCatIds = useMemo(
        () =>
            subCategories
                .filter((item) => item.rootCategoryId === cat?._id)
                .map((item) => item._id),
        [subCategories, cat?._id],
    );

    const hasFilters =
        searchTerm.length >= 3 ||
        selectedAllergens.length > 0 ||
        selectedMeat.length > 0 ||
        selectedSide.length > 0;

    const filteredParams = useMemo(
        () =>
            buildQuery({
                selectedSubCategories: subCatIds,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                limit: 8,
            }),
        [subCatIds, selectedMeat, selectedSide, selectedAllergens, searchTerm],
    );

    const categoryParams = useMemo(
        () =>
            subCat?._id
                ? buildQuery({
                      selectedSubCategories: [subCat._id],
                      limit: 8,
                  })
                : skipToken,
        [subCat?._id],
    );

    const filterQueryParams = useMemo(
        () => (isSearch ? filteredParams : skipToken),
        [isSearch, filteredParams],
    );

    const {
        data: categoryData,
        isFetching: isFetchingCategory,
        isLoading: isLoadingCategory,
    } = useGetRecipesQuery(categoryParams, { refetchOnMountOrArgChange: true });

    const { data: filterData, isFetching: isFetchingFilter } = useGetRecipesQuery(
        filterQueryParams,
        {
            refetchOnMountOrArgChange: isFilterClose,
        },
    );

    const activeData = isSearch ? filterData : categoryData;
    const isFetching = isSearch ? isFetchingFilter : isFetchingCategory;

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(cat?._id ?? null);

    useEffect(() => {
        dispatch(setHasResults(searchTerm.length < 3 ? null : !!activeData?.data?.length));
    }, [dispatch, searchTerm, activeData]);

    useEffect(() => {
        if (!hasFilters) {
            setMessage('');
        } else if (activeData?.data?.length === 0) {
            setMessage('По вашему запросу ничего не найдено. Попробуйте другой запрос');
        } else {
            setMessage('');
        }
    }, [activeData, hasFilters]);

    if (!cat || !subCat || subCat.rootCategoryId !== cat._id) {
        return <Navigate to='/not-found' replace />;
    }

    if (isLoadingCategory) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
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
                <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                    {message || cat?.title}
                </Heading>
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
                <SearchBar
                    isLoader={isFetching && hasFilters && isFilterClose}
                    handleFilterClose={setIsFilterClose}
                />
            </Box>

            <TabsCategory subcategories={cat?.subCategories ?? []} />

            {activeData?.data && <RecipeList recipes={activeData.data} gridVariant='low' />}

            <KitchenSection
                title={randomTitle}
                description={randomDescription}
                relevantRecipes={randomRecipes}
            />
        </Box>
    );
};

export default CategoryPage;
