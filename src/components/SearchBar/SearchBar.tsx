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

import { FilterIcon, SearchGlass } from '~/assets/icons/icons';
import MultipleSelect from '~/components/MultipleSelect/MultipleSelect';

import FilterDrawer from '../Drawer/Drawer';

interface SearchProps {
    bottom?: string;
    selectedAllergens: string[];
    onChangeSelectedAllergens: (values: string[]) => void;
    excludeAllergens: boolean;
    onToggleExcludeAllergens: () => void;
    onSearch: (query: string) => void; // 👈 добавлен проп
}

const SearchBar = ({
    bottom = '56px',
    selectedAllergens,
    onChangeSelectedAllergens,
    excludeAllergens,
    onToggleExcludeAllergens,
    onSearch,
}: SearchProps) => {
    const [isFilterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                        pr={{ md: 6, lg: 4 }}
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
                            onChange={onToggleExcludeAllergens}
                        />
                    </HStack>
                    <MultipleSelect
                        selected={selectedAllergens}
                        onChange={onChangeSelectedAllergens}
                    />
                </HStack>
            </Hide>
        </Box>
    );
};

export default SearchBar;
