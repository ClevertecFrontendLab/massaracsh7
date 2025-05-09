import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { KitchenSection } from '~/components/KitchenSection/KitchenSection';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { SearchBar } from '~/components/SearchBar/SearchBar';
import { BASE_LIMIT_JUICY } from '~/constants/constants';
import { LOAD_MORE_BUTTON } from '~/constants/test-ids';
import { useRandomCategory } from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import {
    selectHasFiltersOrSearch,
    selectIsSearch,
    selectSearchTerm,
    selectSelectedAllergens,
    selectSelectedCategories,
    selectSelectedMeat,
    selectSelectedSide,
} from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';
import { Recipe } from '~/types/apiTypes';
import { buildQuery } from '~/utils/buildQuery';

export const JuicyPage = () => {
    const [page, setPage] = useState(1);
    const [isFilterClose, setIsFilterClose] = useState(true);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);
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
                page,
            }),
        [page],
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
                page,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm, page],
    );

    const queryParams = isSearch ? filteredParams : baseParams;

    const { data, isLoading, isFetching, isSuccess } = useGetRecipesQuery(queryParams, {
        refetchOnMountOrArgChange: isFilterClose,
    });

    const isLastPage = data && data?.meta?.page >= data?.meta?.totalPages;
    const isEmptyResult = useMemo(
        () => hasFiltersOrSearch && data?.data?.length === 0,
        [hasFiltersOrSearch, data],
    );

    useEffect(() => {
        if (!isSuccess || !data?.data) return;

        if (page === 1) {
            setJuiciestRecipes(data.data);
        } else {
            setJuiciestRecipes((prev) => [...prev, ...data.data]);
        }
    }, [data?.data, isSuccess, page]);

    useEffect(() => {
        setMessage(isEmptyResult ? 'Ничего не найдено по вашему запросу' : '');
    }, [isEmptyResult]);

    const loadMoreRecipes = () => {
        setPage((prev) => prev + 1);
    };

    if (isLoading && page === 1) {
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
                    isLoader={isFetching && page === 1 && isFilterClose}
                    handleFilterClose={setIsFilterClose}
                />
            </Box>

            {message ? (
                <Center>{message}</Center>
            ) : (
                <>
                    <RecipeList recipes={juiciestRecipes} gridVariant='low' />
                    <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                        {!isLastPage && (
                            <Button
                                variant='limeSolid'
                                size='medium'
                                onClick={loadMoreRecipes}
                                data-test-id={LOAD_MORE_BUTTON}
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
