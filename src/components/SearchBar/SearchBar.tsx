import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Hide,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { FilterIcon, SearchGlass } from '~/assets/icons/icons';
import MultipleSelect from '~/components/MultipleSelect/MultipleSelect';
import { ApplicationState } from '~/store/configure-store';
import {
    setHasResults,
    setIsSearch,
    setSearchTerm,
    toggleExcludeAllergens,
} from '~/store/filter-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import FilterDrawer from '../Drawer/Drawer';
interface SeachBarProps {
    isLoader: boolean;
    handleFilterClose: (value: boolean) => void;
}

const SearchBar = ({ isLoader, handleFilterClose }: SeachBarProps) => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const dispatch = useAppDispatch();
    const excludeAllergens = useAppSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );

    const selectedAllergens = useAppSelector(
        (state: ApplicationState) => state.filters.selectedAllergens,
    );

    const hasResults = useSelector((state: ApplicationState) => state.filters.hasResults);
    const openFilterDrawer = () => {
        setFilterOpen(true);
        handleFilterClose(false);
    };
    const closeFilterDrawer = () => {
        setFilterOpen(false);
        handleFilterClose(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        if (searchText.trim().length >= 3 || excludeAllergens) {
            dispatch(setSearchTerm(searchText));
            dispatch(setIsSearch(true));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearInput = () => {
        setSearchText('');
        dispatch(setSearchTerm(''));
        dispatch(setHasResults(null));
        dispatch(setIsSearch(false));
    };

    const isSearchActive = searchText.trim().length >= 3 || selectedAllergens.length > 0;
    if (isLoader && !isFilterOpen && !excludeAllergens) {
        return (
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='lime.500'
                size='xl'
                data-test-id='loader-search-block'
            />
        );
    }
    return (
        <Box>
            <HStack spacing={{ base: 3, sm: 3, md: 3, lg: 4 }} w='100%' mb={4}>
                <IconButton
                    aria-label='Фильтр поиска'
                    icon={<FilterIcon boxSize={{ base: '12px', md: '12px', lg: '18px' }} />}
                    variant='outline'
                    colorScheme='gray'
                    w={{ base: 8, sm: 8, md: 8, lg: 12 }}
                    minW={{ base: 8, sm: 8, md: 8, lg: 12 }}
                    h={{ base: 8, sm: 8, md: 8, lg: 12 }}
                    onClick={openFilterDrawer}
                    data-test-id='filter-button'
                />

                <InputGroup w='100%'>
                    <Input
                        placeholder='Название или ингредиент...'
                        variant='outline'
                        bg='white'
                        borderRadius='md'
                        pr={{ base: 10, lg: 12 }}
                        pl='12px'
                        py='13px'
                        fontSize={{ md: '14px', lg: '18px' }}
                        lineHeight={{ md: '17px', lg: '22px' }}
                        color='customLime.800'
                        _placeholder={{ color: 'customLime.800' }}
                        height={{ base: 8, sm: 8, md: 8, lg: 12 }}
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        focusBorderColor={
                            hasResults === true
                                ? 'customLime.600'
                                : hasResults === false
                                  ? 'red.600'
                                  : 'blackAlpha.200'
                        }
                        borderColor={
                            hasResults === true
                                ? 'customLime.600'
                                : hasResults === false
                                  ? 'red.600'
                                  : 'blackAlpha.200'
                        }
                        _hover={{ borderColor: 'blackAlpha.200' }}
                        data-test-id='search-input'
                    />
                    <InputRightElement height='100%' pr='24px'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IconButton
                                aria-label='Очистить'
                                icon={<CloseIcon boxSize='10px' />}
                                size='xs'
                                variant='ghost'
                                onClick={handleClearInput}
                                style={{
                                    visibility: searchText ? 'visible' : 'hidden',
                                }}
                            />
                            <IconButton
                                aria-label='Поиск'
                                icon={<SearchGlass boxSize={{ md: '14px', lg: '18px' }} />}
                                variant='ghost'
                                size='sm'
                                p={2}
                                isDisabled={!isSearchActive}
                                onClick={handleSearch}
                                data-test-id='search-button'
                                sx={{
                                    pointerEvents: isSearchActive ? 'auto' : 'none',
                                }}
                            />
                        </div>
                    </InputRightElement>
                </InputGroup>
            </HStack>

            <Hide below='md'>
                <HStack spacing='15px' w='100%'>
                    <HStack spacing={3} py={1.5} pl={2}>
                        <Text textStyle='descriptionText'>Исключить мои аллергены</Text>
                        <Switch
                            size='md'
                            isChecked={excludeAllergens}
                            onChange={() => dispatch(toggleExcludeAllergens())}
                            bg='lime.400'
                            data-test-id='allergens-switcher'
                        />
                    </HStack>
                    {!isFilterOpen && (
                        <MultipleSelect width='234px' isDisabled={!excludeAllergens} />
                    )}
                </HStack>
            </Hide>
            <FilterDrawer isOpen={isFilterOpen} onClose={closeFilterDrawer} />
        </Box>
    );
};

export default SearchBar;
