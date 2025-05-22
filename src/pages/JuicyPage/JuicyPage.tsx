import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { KitchenSection } from '~/components/KitchenSection/KitchenSection';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { SearchBar } from '~/components/SearchBar/SearchBar';
import { BASE_LIMIT_JUICY } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { useRandomCategory } from '~/hooks/useRandomCategory';
import { useGetRecipesPagesInfiniteQuery } from '~/query/services/recipes';
import { useAppSelector } from '~/store/hooks';
import {
    selectHasFiltersOrSearch,
    selectIsSearch,
    selectSearchTerm,
    selectSelectedAllergens,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
} from '~/store/selectors/filtersSelectors';
import { buildQuery } from '~/utils/buildQuery';

export const JuicyPage = () => {
    const [isFilterClose, setIsFilterClose] = useState(true);
    const [message, setMessage] = useState('');

    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const selectedSubCategories = useAppSelector(selectSelectedCategories);
    const selectedMeat = useAppSelector(selectSelectedMeat);
    const selectedSide = useAppSelector(selectSelectedSide);
    const searchTerm = useAppSelector(selectSearchTerm);
    const isSearch = useAppSelector(selectIsSearch);
    const hasFiltersOrSearch = useAppSelector(selectHasFiltersOrSearch);

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);

    const baseParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: BASE_LIMIT_JUICY,
            }),
        [],
    );

    const filteredParams = useMemo(
        () =>
            buildQuery({
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: BASE_LIMIT_JUICY,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm],
    );

    const queryParams = isSearch ? filteredParams : baseParams;

    const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isSuccess } =
        useGetRecipesPagesInfiniteQuery(queryParams, {
            refetchOnMountOrArgChange: isFilterClose,
        });

    const allRecipes = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

    const isEmptyResult = useMemo(
        () => hasFiltersOrSearch && isSuccess && allRecipes.length === 0,
        [hasFiltersOrSearch, isSuccess, allRecipes],
    );

    useEffect(() => {
        setMessage(isEmptyResult ? 'Ничего не найдено по вашему запросу' : '');
    }, [isEmptyResult]);

    if (isLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    return (
        <Box>
            <Box
                boxShadow={searchTerm || selectedAllergens.length > 0 ? 'main' : 'none'}
                pb={8}
                mb={6}
                borderRadius='0 0 8px 8px'
                width={{ base: '100%', md: '578px', xl: '898px' }}
                mx='auto'
                px={{ base: '16px', lg: '30px', xl: '190px' }}
            >
                <Heading variant='pageTitle' mb={8}>
                    Самое сочное
                </Heading>
                <SearchBar
                    isLoader={isFetching && isFilterClose}
                    handleFilterClose={setIsFilterClose}
                />
            </Box>

            {message ? (
                <Center>{message}</Center>
            ) : (
                <>
                    <RecipeList recipes={allRecipes} gridVariant='low' />
                    <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                        {hasNextPage && (
                            <Button
                                variant='limeSolid'
                                size='medium'
                                onClick={() => fetchNextPage()}
                                data-test-id={TEST_IDS.LOAD_MORE_BUTTON}
                            >
                                Загрузка
                            </Button>
                        )}
                    </Center>
                </>
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
