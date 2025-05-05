import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
// import { authors } from '~/data/authors';
// import { tryDishes, veganDishes } from '~/data/cardsData';
// import categories from '~/data/categories';
// import { dishes } from '~/data/dishes';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { Recipe } from '~/types/apiTypes';

const JuicyPage = () => {
    const selectedAllergens = useSelector(
        (state: ApplicationState) => state.filters.selectedAllergens,
    );
    const excludeAllergens = useSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );
    const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);
    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);
    const [page, setPage] = useState(1);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);

    const {
        data,
        isLoading: isLoading,
        isFetching,
        isSuccess,
    } = useGetRecipesQuery(
        {
            sortBy: 'likes',
            sortOrder: 'desc',
            limit: 8,
            page,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (isSuccess) {
            setJuiciestRecipes((prev) => [...prev, ...(data?.data || [])]);
        }
    }, [isSuccess, data]);

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
