import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import {
    BASE_LIMIT_SLIDER,
    ERROR_SEARCH_MESSAGE,
    MAIN_LIMIT_JUICY,
    MIN_SEARCH_LENGTH,
} from '~/constants/constants';
import { JUICIEST_LINK, JUICIEST_LINK_MOB } from '~/constants/test-ids';
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
        isSearch,
    } = useAppSelector((state: ApplicationState) => state.filters);

    const [message, setMessage] = useState('');

    const baseJuicyParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: MAIN_LIMIT_JUICY,
                page: 1,
            }),
        [],
    );

    const filteredJuicyParams = useMemo(
        () =>
            buildQuery({
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                selectedAllergens,
                searchTerm,
                sortBy: 'likes',
                sortOrder: 'desc',
                limit: MAIN_LIMIT_JUICY,
                page: 1,
            }),
        [selectedSubCategories, selectedMeat, selectedSide, selectedAllergens, searchTerm],
    );

    const juicyParams = isSearch ? filteredJuicyParams : baseJuicyParams;

    const { data: juiciestRecipes, isFetching: isLoadingJuiciest } = useGetRecipesQuery(
        juicyParams,
        {
            refetchOnMountOrArgChange: isFilterClose,
        },
    );

    const baseSliderParams = useMemo(
        () =>
            buildQuery({
                sortBy: 'createdAt',
                sortOrder: 'desc',
                limit: BASE_LIMIT_SLIDER,
            }),
        [],
    );

    const filteredSliderParams = useMemo(
        () =>
            buildQuery({
                selectedAllergens,
                selectedSubCategories,
                selectedMeat,
                selectedSide,
                sortBy: 'createdAt',
                sortOrder: 'desc',
                limit: BASE_LIMIT_SLIDER,
            }),
        [selectedAllergens, selectedSubCategories, selectedMeat, selectedSide],
    );

    const sliderParams = isSearch ? filteredSliderParams : baseSliderParams;

    const { data: sliderRecipes } = useGetRecipesQuery(sliderParams, {
        refetchOnMountOrArgChange: isFilterClose,
    });

    useEffect(() => {
        juiciestRecipes?.data &&
            dispatch(
                setHasResults(searchTerm.length < 3 ? null : juiciestRecipes?.data.length > 0),
            );
    }, [dispatch, searchTerm, juiciestRecipes?.data]);

    useEffect(() => {
        const noFiltersOrSearch =
            searchTerm.length < MIN_SEARCH_LENGTH &&
            selectedAllergens.length === 0 &&
            !selectedMeat &&
            !selectedSide;

        if (noFiltersOrSearch) {
            setMessage('');
            return;
        }

        if (juiciestRecipes && juiciestRecipes.data?.length === 0) {
            setMessage(ERROR_SEARCH_MESSAGE);
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

            {searchTerm.length < MIN_SEARCH_LENGTH && sliderRecipes?.data && (
                <SliderList recipes={sliderRecipes?.data} />
            )}

            {searchTerm.length < MIN_SEARCH_LENGTH && (
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
                        data-test-id={JUICIEST_LINK}
                        variant='limeSolid'
                        size='large'
                        rightIcon={<ArrowBlackRight w='14px' />}
                        onClick={() => navigate('/the-juiciest')}
                    >
                        Вся подборка
                    </Button>
                </HStack>
            )}

            {juiciestRecipes?.data && (
                <RecipeList
                    recipes={juiciestRecipes?.data}
                    gridVariant={searchTerm.length >= MIN_SEARCH_LENGTH ? 'low' : 'wide'}
                />
            )}

            <Button
                display={{ base: 'none', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}
                data-test-id={JUICIEST_LINK_MOB}
                variant='limeSolid'
                size='large'
                mb={8}
                mx='auto'
                rightIcon={<ArrowBlackRight w='14px' />}
                onClick={() => navigate('/the-juiciest')}
            >
                Вся подборка
            </Button>

            {searchTerm.length < MIN_SEARCH_LENGTH && <BlogList />}
            {searchTerm.length < MIN_SEARCH_LENGTH && randomRecipes && (
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
