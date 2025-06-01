import { Box, Heading, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { KitchenSection } from '~/components/KitchenSection/KitchenSection';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { SearchBar } from '~/components/SearchBar/SearchBar';
import { TabsCategory } from '~/components/TabsCategory/TabsCategory';
import { BASE_LIMIT_JUICY, ERROR_SEARCH_MESSAGE, MIN_SEARCH_LENGTH } from '~/constants/constants';
import { useRandomCategory } from '~/hooks/useRandomCategory';
import { useGetRecipesByCategoryQuery, useGetRecipesQuery } from '~/query/services/recipes';
import { selectAllCategories, selectAllSubCategories } from '~/store/category-slice';
import {
    selectExcludeAllergens,
    selectHasAnyFilter,
    selectIsSearch,
    selectSearchTerm,
    selectSelectedAllergens,
    selectSelectedMeat,
    selectSelectedSide,
    setHasResults,
} from '~/store/filter-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { buildQuery } from '~/utils/buildQuery';

export const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const dispatch = useAppDispatch();

    const categories = useAppSelector(selectAllCategories);
    const subCategories = useAppSelector(selectAllSubCategories);

    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedMeat = useAppSelector(selectSelectedMeat);
    const selectedSide = useAppSelector(selectSelectedSide);
    const searchTerm = useAppSelector(selectSearchTerm);
    const isSearch = useAppSelector(selectIsSearch);
    const hasFilters = useAppSelector(selectHasAnyFilter);
    const excludeAllergens = useAppSelector(selectExcludeAllergens);

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

    const filteredParams = useMemo(() => {
        if (!subCatIds.length) return skipToken;
        return buildQuery({
            selectedSubCategories: subCatIds,
            selectedMeat,
            selectedSide,
            selectedAllergens,
            searchTerm,
            limit: BASE_LIMIT_JUICY,
        });
    }, [subCatIds, selectedMeat, selectedSide, selectedAllergens, searchTerm]);

    const {
        data: recipesDataFilter,
        isFetching: isFetchingFilter,
        isLoading: isLoadingFilter,
    } = useGetRecipesQuery(!isSearch ? skipToken : filteredParams, {
        refetchOnMountOrArgChange: isFilterClose,
    });
    const {
        data: recipesDataBase,
        isFetching: isFetchingBase,
        isLoading: isLoadingBase,
    } = useGetRecipesByCategoryQuery(
        !subCat?._id || isSearch
            ? skipToken
            : {
                  id: subCat._id,
                  page: 1,
                  limit: BASE_LIMIT_JUICY,
              },
        {
            refetchOnMountOrArgChange: isFilterClose,
        },
    );

    const recipesData = isSearch ? recipesDataFilter : recipesDataBase;
    const isLoading = isSearch ? isLoadingFilter : isLoadingBase;
    const isFetching = isSearch ? isFetchingFilter : isFetchingBase;

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(cat?._id ?? null);

    const isEmptyResult = useMemo(
        () => hasFilters && recipesData?.data?.length === 0,
        [hasFilters, recipesData],
    );

    useEffect(() => {
        dispatch(
            setHasResults(
                searchTerm.length < MIN_SEARCH_LENGTH ? null : !!recipesData?.data?.length,
            ),
        );
    }, [dispatch, searchTerm, recipesData]);

    useEffect(() => {
        if (!hasFilters) {
            setMessage('');
        } else if (isEmptyResult) {
            setMessage(ERROR_SEARCH_MESSAGE);
        } else {
            setMessage('');
        }
    }, [isEmptyResult, hasFilters]);

    if (!cat || !subCat || subCat.rootCategoryId !== cat._id) {
        return <Navigate to={ROUTES_PATH.NOT_FOUND} replace />;
    }

    if (isLoading || isFetching) {
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

            {recipesData?.data && recipesData?.data?.length > 0 && (
                <RecipeList recipes={recipesData.data} gridVariant='low' />
            )}

            {randomRecipes && (
                <KitchenSection
                    title={randomTitle}
                    description={randomDescription}
                    relevantRecipes={randomRecipes}
                />
            )}
        </Box>
    );
};
