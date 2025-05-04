import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { setHasResults, triggerRefetch } from '~/store/filter-slice';
import { buildQuery } from '~/utils/buildQuery';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedAllergens,
        excludeAllergens,
        selectedCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useSelector((state: ApplicationState) => state.filters);
    const refetchTrigger = useSelector((state: ApplicationState) => state.filters.refetchTrigger);

    console.log(refetchTrigger);

    // const {
    //     data: sliderRecipes,
    //     isLoading,
    //     isError,
    // } = useGetRecipesQuery(sliderParams, {
    //     refetchOnMountOrArgChange: refetchTrigger,
    // });

    const sliderParams = useMemo(
        () =>
            buildQuery({
                selectedAllergens,
                selectedCategories,
                selectedMeat,
                selectedSide,
                searchTerm,
                sortBy: 'createdAt',
                sortOrder: 'asc',
                limit: 10,
            }),
        [selectedAllergens, selectedCategories, selectedMeat, selectedSide, searchTerm],
    );

    const juiciestParams = useMemo(
        () =>
            buildQuery({
                selectedCategories,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: 4,
                page: 1,
            }),
        [selectedCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm],
    );

    // const { data: juiciestRecipes } = useGetRecipesQuery(juiciestParams, {
    //     refetchOnMountOrArgChange: refetchTrigger,
    // });

    const [
        fetchSliderRecipes,
        {
            data: sliderRecipes,
            // isLoading: isSliderLoading,
            // isError: isSliderError,
        },
    ] = useLazyGetRecipesQuery();

    const [
        fetchJuiciestRecipes,
        { data: juiciestRecipes, isLoading: isLoading, isError: isError },
    ] = useLazyGetRecipesQuery();

    const handleRefetch = useCallback(() => {
        if (refetchTrigger !== 0) {
            fetchSliderRecipes(sliderParams);
            fetchJuiciestRecipes(juiciestParams);
        }
    }, [refetchTrigger, fetchSliderRecipes, fetchJuiciestRecipes, sliderParams, juiciestParams]);

    useEffect(() => {
        dispatch(triggerRefetch());
    }, [dispatch]);

    useEffect(() => {
        handleRefetch();
    }, [handleRefetch]);

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);

    useEffect(() => {
        dispatch(
            setHasResults(
                searchTerm.length < 2 ? null : juiciestRecipes?.data?.length ? true : false,
            ),
        );
    }, [dispatch, searchTerm, juiciestRecipes?.data.length]);

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (isError) {
        return <Text>Error...</Text>;
    }
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
                <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                    Приятного аппетита!
                </Heading>
                <SearchBar />
            </Box>
            {searchTerm.length < 2 && sliderRecipes && <SliderList recipes={sliderRecipes?.data} />}

            {searchTerm.length < 2 && (
                <>
                    <HStack justify='space-between' mb={{ base: 3, sm: 3, md: 3, lg: 4, xl: 6 }}>
                        <Heading variant='sectionTitle'>Самое сочное</Heading>
                        <Button
                            display={{
                                base: 'flex',
                                sm: 'none',
                                md: 'none',
                                lg: 'flex',
                                xl: 'flex',
                            }}
                            data-test-id='juiciest-link'
                            variant='limeSolid'
                            size='large'
                            rightIcon={<ArrowBlackRight w='14px' />}
                            onClick={() => navigate('/the-juiciest')}
                        >
                            Вся подборка
                        </Button>
                    </HStack>
                </>
            )}
            {juiciestRecipes && (
                <RecipeList
                    recipes={juiciestRecipes.data}
                    gridVariant={searchTerm.length >= 2 ? 'low' : 'wide'}
                />
            )}

            <Button
                display={{ base: 'none', sm: 'block', md: 'block', lg: 'none', xl: 'none' }}
                data-test-id='juiciest-link-mobile'
                variant='limeSolid'
                size='large'
                mb={8}
                mx='auto'
                rightIcon={<ArrowBlackRight w='14px' />}
                onClick={() => navigate('/the-juiciest')}
            >
                Вся подборка
            </Button>

            {searchTerm.length < 3 && <BlogList />}
            {searchTerm.length < 3 && randomRecipes && (
                <KitchenSection
                    title={randomTitle}
                    description={randomDescription}
                    relevantRecipes={randomRecipes}
                />
            )}
        </Box>
    );
};

export default Main;
