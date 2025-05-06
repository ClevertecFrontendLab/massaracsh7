import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { setHasResults } from '~/store/filter-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { buildQuery } from '~/utils/buildQuery';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);
    const [isFilterClose, setIsFilterClose] = useState(true);

    const {
        selectedAllergens,
        excludeAllergens,
        selectedSubCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useAppSelector((state: ApplicationState) => state.filters);

    const sliderParams = useMemo(
        () =>
            buildQuery({
                selectedAllergens,
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                sortBy: 'createdAt',
                sortOrder: 'desc',
                limit: 10,
            }),
        [selectedAllergens, selectedSubCategories, selectedMeat, selectedSide],
    );

    const defaultSliderParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'createdAt',
                sortOrder: 'desc',
                limit: 10,
            }),
        [],
    );

    const juiciestParams = useMemo(
        () =>
            buildQuery({
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: 4,
                page: 1,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm],
    );

    const defaultParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: 4,
                page: 1,
            }),
        [],
    );

    const { data: sliderRecipes } = useGetRecipesQuery(sliderParams, {
        refetchOnMountOrArgChange: isFilterClose,
    });

    const { data: defaultSliderRecipes } = useGetRecipesQuery(defaultSliderParams, {
        skip: !sliderRecipes || sliderRecipes.data?.length > 0,
    });

    const { data: juiciestRecipes, isFetching: isLoadingJuiciest } = useGetRecipesQuery(
        juiciestParams,
        {
            refetchOnMountOrArgChange: isFilterClose,
        },
    );

    const { data: defaultRecipes } = useGetRecipesQuery(defaultParams, {
        skip: !juiciestRecipes || juiciestRecipes.data?.length > 0,
    });

    const [message, setMessage] = useState('');

    const recipesToShow = useMemo(() => {
        if (juiciestRecipes?.data && juiciestRecipes?.data?.length > 0) return juiciestRecipes.data;
        if (searchTerm || selectedAllergens.length || selectedMeat || selectedSide) {
            return defaultRecipes?.data || [];
        }
        return juiciestRecipes?.data || [];
    }, [
        juiciestRecipes?.data,
        defaultRecipes?.data,
        searchTerm,
        selectedAllergens,
        selectedMeat,
        selectedSide,
    ]);

    const sliderRecipesToShow = useMemo(() => {
        if (sliderRecipes?.data && sliderRecipes?.data?.length > 0) return sliderRecipes.data;
        if (searchTerm || selectedAllergens.length || selectedMeat || selectedSide) {
            return defaultSliderRecipes?.data || [];
        }
        return sliderRecipes?.data || [];
    }, [
        sliderRecipes?.data,
        defaultSliderRecipes?.data,
        searchTerm,
        selectedAllergens,
        selectedMeat,
        selectedSide,
    ]);

    useEffect(() => {
        dispatch(setHasResults(searchTerm.length < 3 ? null : recipesToShow.length > 0));
    }, [dispatch, searchTerm, recipesToShow]);

    useEffect(() => {
        const noFiltersOrSearch =
            searchTerm.length < 3 &&
            selectedAllergens.length === 0 &&
            !selectedMeat &&
            !selectedSide;

        if (noFiltersOrSearch) {
            setMessage('');
            return;
        }

        if (juiciestRecipes && juiciestRecipes.data?.length === 0) {
            setMessage('По вашему запросу ничего не найдено. Попробуйте другой запрос');
        } else {
            setMessage('');
        }
    }, [juiciestRecipes, searchTerm, selectedAllergens, selectedMeat, selectedSide]);

    return (
        <Box>
            <Box
                boxShadow={
                    searchTerm || selectedAllergens.length > 0 || excludeAllergens || message
                        ? 'main'
                        : 'none'
                }
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
                    <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                        Приятного аппетита!
                    </Heading>
                )}
                <SearchBar
                    isLoader={isLoadingJuiciest && isFilterClose}
                    handleFilterClose={setIsFilterClose}
                />
            </Box>

            {searchTerm.length < 3 && sliderRecipesToShow && (
                <SliderList recipes={sliderRecipesToShow} />
            )}

            {searchTerm.length < 3 && (
                <HStack justify='space-between' mb={{ base: 3, sm: 3, md: 3, lg: 4, xl: 6 }}>
                    <Heading variant='sectionTitle'>Самое сочное</Heading>
                    <Button
                        display={{
                            base: 'flex',
                            sm: 'none',
                            md: 'flex',
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
            )}

            {recipesToShow && (
                <RecipeList
                    recipes={recipesToShow}
                    gridVariant={searchTerm.length >= 2 ? 'low' : 'wide'}
                />
            )}

            <Button
                display={{ base: 'none', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}
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
