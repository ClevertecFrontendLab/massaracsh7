import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { useAppSelector } from '~/store/hooks';
import { Recipe } from '~/types/apiTypes';
import { buildQuery } from '~/utils/buildQuery';

const JuicyPage = () => {
    const {
        selectedAllergens,
        excludeAllergens,
        selectedSubCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useAppSelector((state: ApplicationState) => state.filters);
    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);
    const [page, setPage] = useState(1);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);

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
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: 8,
                page,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm, page],
    );
    const baseParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: 8,
                page,
            }),
        [page],
    );
    const queryParams = hasFilters ? filteredParams : baseParams;

    const {
        data,
        isLoading: isLoading,
        isFetching,
        isSuccess,
    } = useGetRecipesQuery(
        {
            ...queryParams,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            if (page === 1) {
                setJuiciestRecipes(data.data);
            } else {
                setJuiciestRecipes((prev) => {
                    const prevIds = new Set(prev.map((r) => r._id));
                    const unique = data.data.filter((r) => !prevIds.has(r._id));
                    return [...prev, ...unique];
                });
            }
        }
    }, [isSuccess, data, page]);

    useEffect(() => {
        setPage(1);
        setJuiciestRecipes([]);
    }, [selectedAllergens, selectedSubCategories, selectedMeat, selectedSide, searchTerm]);

    const loadMoreRecipes = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const isLastPage = data && data?.meta.page >= data?.meta.totalPages;

    return (
        <Box>
            <Box
                boxShadow={
                    searchTerm || selectedAllergens.length > 0 || excludeAllergens ? 'main' : 'none'
                }
                pb={8}
                mb={6}
                borderRadius='0 0 8px 8px'
                width={{ base: '100%', sm: '100%', md: '480px', lg: '578px', xl: '898px' }}
                mx='auto'
                px={{ base: '16px', sm: '16px', md: '16px', lg: '30px', xl: '190px' }}
            >
                <Heading variant='pageTitle' mb={8}>
                    Самое сочное
                </Heading>
                <SearchBar isLoader={isFetching} />
            </Box>
            {juiciestRecipes && <RecipeList recipes={juiciestRecipes} gridVariant='low' />}
            <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                {!isLastPage && !isLoading && (
                    <Button variant='limeSolid' size='medium' onClick={loadMoreRecipes}>
                        Загрузить ещё
                    </Button>
                )}
            </Center>
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

export default JuicyPage;
