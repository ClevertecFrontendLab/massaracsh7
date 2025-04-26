import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    Stack,
    Switch,
    Tag,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authors } from '~/data/authors';
import categories from '~/data/categories';
import { ApplicationState } from '~/store/configure-store';
import {
    resetAllFilters,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
    toggleExcludeAllergens,
} from '~/store/filter-slice';

import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { SearchableSelect } from '../SearchableSelect/SearchableSelect';

interface FilterData {
    categories: string[];
    authors: string[];
    meatTypes: string[];
    sideTypes: string[];
    excludeAllergens: boolean;
}

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterDrawer = ({ isOpen, onClose }: FilterDrawerProps) => {
    const dispatch = useDispatch();
    const allergens = useSelector((state: ApplicationState) => state.filters.selectedAllergens);

    const [filters, setFilters] = useState<FilterData>({
        categories: [],
        authors: [],
        meatTypes: [],
        sideTypes: [],
        excludeAllergens: false,
    });

    const categoryOptions = categories.map((item) => item.title);
    const authorOptions = authors.map((item) => item.name);

    const handleClear = () => {
        dispatch(resetAllFilters());
        setFilters({
            categories: [],
            authors: [],
            meatTypes: [],
            sideTypes: [],
            excludeAllergens: false,
        });
    };

    const handleSearch = () => {
        dispatch(setSelectedAuthors(filters.authors));
        dispatch(setSelectedCategories(filters.categories));
        dispatch(setSelectedMeat(filters.meatTypes));
        dispatch(setSelectedSide(filters.sideTypes));
        dispatch(toggleExcludeAllergens());
        console.log('Selected filters:', filters);
        onClose();
    };

    const anySelected =
        filters.categories.length ||
        filters.authors.length ||
        filters.meatTypes.length ||
        filters.sideTypes.length ||
        filters.excludeAllergens;

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} data-test-id='filter-drawer'>
            <DrawerOverlay />
            <DrawerContent
                position='relative'
                maxW={{ sm: '344px', md: '344px', lg: '463px', xl: '463px' }}
                p={{ sm: '4', md: '4', mid: '4', lg: '8', xl: '8' }}
            >
                <HStack justify='space-between' align='center' mb={6}>
                    <DrawerHeader p={0}>Фильтры</DrawerHeader>
                    <IconButton
                        icon={<CloseIcon boxSize='10px' />}
                        onClick={onClose}
                        aria-label='Закрыть фильтр'
                        size='24px'
                        bg='black'
                        color='white'
                        borderRadius='full'
                        p={2}
                        _hover={{ bg: 'gray.700' }}
                        data-test-id='close-filter-drawer'
                    />
                </HStack>

                <DrawerBody p={0}>
                    <VStack align='stretch' spacing={4}>
                        <SearchableSelect
                            label='Категория'
                            options={categoryOptions}
                            selectedValues={filters.categories}
                            onChange={(val) => setFilters((f) => ({ ...f, categories: val }))}
                        />
                        <SearchableSelect
                            label='Поиск по автору'
                            options={authorOptions}
                            selectedValues={filters.authors}
                            onChange={(val) => setFilters((f) => ({ ...f, authors: val }))}
                        />
                        <Box>
                            <Text mb={2}>Тип мяса</Text>
                            <CheckboxGroup
                                value={filters.meatTypes}
                                onChange={(val) =>
                                    setFilters((f) => ({ ...f, meatTypes: val as string[] }))
                                }
                            >
                                <Stack spacing={1}>
                                    <Checkbox value='курица'>Курица</Checkbox>
                                    <Checkbox value='свинина'>Свинина</Checkbox>
                                    <Checkbox value='говядина'>Говядина</Checkbox>
                                    <Checkbox value='индейка'>Индейка</Checkbox>
                                    <Checkbox value='утка'>Утка</Checkbox>
                                </Stack>
                            </CheckboxGroup>
                        </Box>
                        <Box>
                            <Text mb={2}>Гарнир</Text>
                            <CheckboxGroup
                                value={filters.sideTypes}
                                onChange={(val) =>
                                    setFilters((f) => ({ ...f, sideTypes: val as string[] }))
                                }
                            >
                                <Stack spacing={1}>
                                    <Checkbox value='картошка' data-test-id='checkbox-картошка'>
                                        Картошка
                                    </Checkbox>
                                    <Checkbox value='гречка'>Гречка</Checkbox>
                                    <Checkbox value='паста'>Паста</Checkbox>
                                    <Checkbox value='спагетти'>Спагетти</Checkbox>
                                    <Checkbox value='рис'>Рис</Checkbox>
                                    <Checkbox value='капуста'>Капуста</Checkbox>
                                    <Checkbox value='фасоль'>Фасоль</Checkbox>
                                    <Checkbox value='другие овощи'>Другие овощи</Checkbox>
                                </Stack>
                            </CheckboxGroup>
                        </Box>
                        <HStack spacing={3} py={1.5} pl={2}>
                            <Text>Исключить мои аллергены</Text>
                            <Switch
                                size='md'
                                isChecked={filters.excludeAllergens}
                                onChange={(e) =>
                                    setFilters((f) => ({
                                        ...f,
                                        excludeAllergens: e.target.checked,
                                    }))
                                }
                                data-test-id='allergens-switcher-filter'
                            />
                        </HStack>
                        <MultipleSelect
                            width={{
                                sm: '100%',
                                md: '100%',
                                mid: '100%',
                                lg: '399px',
                                xl: '399px',
                            }}
                            sourse='drawer'
                        />

                        <Box>
                            <Text mb={2}>Выбранные фильтры:</Text>
                            <HStack wrap='wrap' spacing={2}>
                                {[
                                    ...filters.categories,
                                    ...filters.authors,
                                    ...filters.meatTypes,
                                    ...filters.sideTypes,
                                ].map((tag) => (
                                    <Tag
                                        size='sm'
                                        key={tag}
                                        borderRadius='6px'
                                        bg='white'
                                        border='1px solid'
                                        borderColor='customLime.400'
                                        data-test-id='filter-tag'
                                    >
                                        <TagLabel color='customLime.600'>{tag}</TagLabel>
                                    </Tag>
                                ))}
                                {filters.excludeAllergens && allergens.length > 0 && (
                                    <>
                                        {allergens.map((item) => (
                                            <Tag
                                                size='sm'
                                                key={item}
                                                borderRadius='6px'
                                                bg='white'
                                                border='1px solid'
                                                borderColor='customLime.400'
                                            >
                                                <TagLabel color='customLime.600'>{item}</TagLabel>
                                            </Tag>
                                        ))}
                                    </>
                                )}
                            </HStack>
                        </Box>
                    </VStack>
                </DrawerBody>
                <DrawerFooter justifyContent='center' gap={2} mt='20px' py='0'>
                    <Button
                        variant='outline'
                        h='48px'
                        borderColor='black'
                        onClick={handleClear}
                        size='large'
                        data-test-id='clear-filter-button'
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        variant='solid'
                        color='white'
                        bg='black'
                        h='48px'
                        onClick={handleSearch}
                        isDisabled={!anySelected}
                        size='large'
                        data-test-id='find-recipe-button'
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;
