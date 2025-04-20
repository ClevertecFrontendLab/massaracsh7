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
    Stack,
    Switch,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { authors } from '~/data/authors';
import categories from '~/data/categories';
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
// import { ApplicationState } from '~/store/configure-store';

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
    // const isAllergens = useSelector((state: ApplicationState) => state.filters.excludeAllergens);

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

    const removeTag = (value: string) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.filter((v) => v !== value),
            authors: prev.authors.filter((v) => v !== value),
            meatTypes: prev.meatTypes.filter((v) => v !== value),
            sideTypes: prev.sideTypes.filter((v) => v !== value),
        }));
    };

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Фильтры</DrawerHeader>
                <DrawerBody>
                    <VStack align='stretch' spacing={4}>
                        <SearchableSelect
                            label='Категория'
                            options={categoryOptions}
                            selectedValues={filters.categories}
                            onChange={(val) => setFilters((f) => ({ ...f, categories: val }))}
                        />
                        <SearchableSelect
                            label='Автор'
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
                                    <Checkbox value='говядина'>Говядина</Checkbox>
                                    <Checkbox value='курица'>Курица</Checkbox>
                                    <Checkbox value='рыба'>Рыба</Checkbox>
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
                                    <Checkbox value='овощи'>Овощи</Checkbox>
                                    <Checkbox value='картофель'>Картофель</Checkbox>
                                    <Checkbox value='рис'>Рис</Checkbox>
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
                            />
                        </HStack>
                        <MultipleSelect />

                        <Box>
                            <Text mb={2}>Выбранные фильтры:</Text>
                            <HStack wrap='wrap' spacing={2}>
                                {[
                                    ...filters.categories,
                                    ...filters.authors,
                                    ...filters.meatTypes,
                                    ...filters.sideTypes,
                                ].map((tag) => (
                                    <Tag key={tag} variant='subtle' colorScheme='green'>
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton onClick={() => removeTag(tag)} />
                                    </Tag>
                                ))}
                                {filters.excludeAllergens && (
                                    <Tag variant='subtle' colorScheme='red'>
                                        <TagLabel>Исключить аллергены</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                setFilters((f) => ({
                                                    ...f,
                                                    excludeAllergens: false,
                                                }))
                                            }
                                        />
                                    </Tag>
                                )}
                            </HStack>
                        </Box>
                    </VStack>
                </DrawerBody>
                <DrawerFooter justifyContent='space-between'>
                    <Button variant='outline' onClick={handleClear}>
                        Очистить фильтр
                    </Button>
                    <Button colorScheme='green' onClick={handleSearch} isDisabled={!anySelected}>
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FilterDrawer;
