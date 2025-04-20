import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Hide,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterIcon, SearchGlass } from '~/assets/icons/icons';
import MultipleSelect from '~/components/MultipleSelect/MultipleSelect';
import { ApplicationState } from '~/store/configure-store';
import { toggleExcludeAllergens } from '~/store/filter-slice';

import FilterDrawer from '../Drawer/Drawer';

interface SearchProps {
    bottom?: string;
    onSearch: (query: string) => void;
}

const SearchBar = ({ bottom = '56px', onSearch }: SearchProps) => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const excludeAllergens = useSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );

    const openFilterDrawer = () => setFilterOpen(true);
    const closeFilterDrawer = () => setFilterOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim().length >= 3) {
            onSearch(searchTerm.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearInput = () => {
        setSearchTerm('');
        onSearch('');
    };

    const isSearchActive = searchTerm.trim().length >= 3;

    return (
        <Box
            width={{ base: '100%', sm: '328px', md: '448px', lg: '518px' }}
            mb={{ sm: '32px', md: '32px', lg: bottom, xl: bottom }}
            mx='auto'
        >
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
                />
                <FilterDrawer isOpen={isFilterOpen} onClose={closeFilterDrawer} />

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
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <InputRightElement
                        alignItems={{
                            base: 'flex-start',
                            sm: 'flex-start',
                            md: 'flex-start',
                            lg: 'flex-end',
                        }}
                    >
                        {searchTerm && (
                            <IconButton
                                aria-label='Очистить'
                                icon={<CloseIcon boxSize='10px' />}
                                size='xs'
                                variant='ghost'
                                onClick={handleClearInput}
                            />
                        )}
                        <IconButton
                            aria-label='Поиск'
                            icon={<SearchGlass boxSize={{ md: '14px', lg: '18px' }} />}
                            variant='ghost'
                            size='sm'
                            p={2}
                            isDisabled={!isSearchActive}
                            onClick={handleSearch}
                        />
                    </InputRightElement>
                </InputGroup>
            </HStack>

            <Hide below='md'>
                <HStack spacing='15px' w='100%' mb={6}>
                    <HStack spacing={3} py={1.5} pl={2}>
                        <Text textStyle='descriptionText'>Исключить мои аллергены</Text>
                        <Switch
                            size='md'
                            isChecked={excludeAllergens}
                            onChange={() => dispatch(toggleExcludeAllergens())}
                        />
                    </HStack>
                    <MultipleSelect />
                </HStack>
            </Hide>
        </Box>
    );
};

export default SearchBar;
