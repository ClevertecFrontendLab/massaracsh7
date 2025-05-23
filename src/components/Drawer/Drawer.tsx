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
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { initialFilterData } from '~/constants/filter-date';
import { TEST_IDS } from '~/constants/test-ids';
import { meatTypes, sideTypes } from '~/data/allergens';
import { authors } from '~/data/authors';
import { selectAllCategories, selectAllSubCategories } from '~/store/category-slice';
import {
    resetAllFilters,
    setIsSearch,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
    setSelectedSubCategories,
} from '~/store/filter-slice';
import { selectExcludeAllergens, selectSelectedAllergens } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';
import { Category } from '~/types/apiTypes';
import { FilterData, SelectOption } from '~/types/utilTypes';
import { getFilterTags } from '~/utils/getFiltersLabels';
import { getSelectedSubIds } from '~/utils/getSelectedSubIds';

import { MultipleSelect } from '../MultipleSelect/MultipleSelect';
import { SearchableSelect } from '../SearchableSelect/SearchableSelect';

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterDrawer = ({ isOpen, onClose }: FilterDrawerProps) => {
    const dispatch = useDispatch();
    const { category } = useParams();

    const allergens = useAppSelector(selectSelectedAllergens);
    const excludeAllergens = useAppSelector(selectExcludeAllergens);
    const categories = useAppSelector(selectAllCategories);
    const subCategories = useAppSelector(selectAllSubCategories);

    const [filters, setFilters] = useState<FilterData>({
        ...initialFilterData,
        excludeAllergens: excludeAllergens,
    });

    const categoryOptions = categories.map((item: Category) => item.title);
    const authorOptions = authors.map((item) => item.name);

    const handleClear = () => {
        dispatch(resetAllFilters());
        dispatch(setIsSearch(false));
        setFilters({ ...initialFilterData, excludeAllergens: false });
    };

    const handleSearch = () => {
        const selectedCategoryIds = categories
            .filter((cat) => filters.categories.includes(cat.title))
            .map((cat) => cat._id);

        const selectedSubCategoryIds = getSelectedSubIds(
            category,
            categories,
            subCategories,
            selectedCategoryIds,
        );

        dispatch(setSelectedAuthors(filters.authors));
        dispatch(setSelectedCategories(filters.categories));
        dispatch(setSelectedMeat(filters.meatTypes));
        dispatch(setSelectedSide(filters.sideTypes));
        dispatch(setSelectedSubCategories(selectedSubCategoryIds));
        dispatch(setIsSearch(true));
        onClose();
    };

    const filterSelected =
        filters.categories.length ||
        filters.authors.length ||
        filters.meatTypes.length ||
        filters.sideTypes.length ||
        !!allergens.length;

    const removeTag = (label: string) => {
        const meatValue = meatTypes.find((item) => item.label === label)?.value;
        const sideValue = sideTypes.find((item) => item.label === label)?.value;
        const value = meatValue || sideValue || label;
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.filter((v) => v !== value),
            authors: prev.authors.filter((v) => v !== value),
            meatTypes: prev.meatTypes.filter((v) => v !== value),
            sideTypes: prev.sideTypes.filter((v) => v !== value),
        }));
    };

    const tags = getFilterTags(filters, meatTypes, sideTypes, allergens);

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
                position='relative'
                maxW={{ sm: '344px', md: '344px', lg: '463px', xl: '463px' }}
                p={{ sm: '4', md: '4', mid: '4', lg: '8', xl: '8' }}
                pr={{ sm: '5', md: '5', mid: '5', lg: '7', xl: '7' }}
                data-test-id={TEST_IDS.FILTER_DRAWER}
            >
                <HStack justify='space-between' align='center' mb={6}>
                    <DrawerHeader p={0}>Фильтр</DrawerHeader>
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
                        data-test-id={TEST_IDS.CLOSE_FILTER_DRAWER}
                    />
                </HStack>

                <DrawerBody
                    p={0}
                    overflowX='hidden'
                    overflowY='auto'
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(0, 0, 0, 0.16)',
                            borderRadius: '8px',
                            maxHeight: '30%',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(0, 0, 0, 0.04)',
                            borderRadius: '8px',
                        },
                    }}
                >
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
                                    {meatTypes.map((meat: SelectOption) => (
                                        <Checkbox key={meat.value} value={meat.value}>
                                            {meat.label}
                                        </Checkbox>
                                    ))}
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
                                    {sideTypes.map((side: SelectOption) => (
                                        <Checkbox
                                            key={side.value}
                                            value={side.value}
                                            data-test-id={
                                                side.value === 'potatoes'
                                                    ? 'checkbox-картошка'
                                                    : undefined
                                            }
                                        >
                                            {side.label}
                                        </Checkbox>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        </Box>
                        <HStack spacing={3} py={1.5} pl={2}>
                            <Text>Исключить мои аллергены</Text>
                            <Switch
                                size='md'
                                isChecked={filters.excludeAllergens}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setFilters((f) => ({
                                        ...f,
                                        excludeAllergens: checked,
                                    }));
                                }}
                                data-test-id={TEST_IDS.ALLERGEN_SWITCHER_FILTER}
                            />
                        </HStack>
                        <MultipleSelect
                            width={{
                                sm: '100%',
                                md: '100%',
                                mid: '100%',
                                lg: '390px',
                                xl: '390px',
                            }}
                            sourse='drawer'
                            isDisabled={!filters.excludeAllergens}
                        />

                        <Box>
                            <Text mb={2}>Выбранные фильтры:</Text>
                            <HStack wrap='wrap' spacing={2}>
                                {tags.map((tag) => (
                                    <Tag
                                        size='sm'
                                        key={tag}
                                        borderRadius='6px'
                                        bg='customLime.100'
                                        border='1px solid'
                                        borderColor='customLime.400'
                                        data-test-id={TEST_IDS.FILTER_TAG}
                                    >
                                        <TagLabel color='customLime.700'>{tag}</TagLabel>
                                        <TagCloseButton
                                            color='customLime.700'
                                            onClick={() => removeTag(tag)}
                                        />
                                    </Tag>
                                ))}
                            </HStack>
                        </Box>
                    </VStack>
                </DrawerBody>
                <DrawerFooter justifyContent='right' gap={2} mt='54px' p='0'>
                    <Button
                        variant='outline'
                        h='48px'
                        borderColor='black'
                        onClick={handleClear}
                        size='large'
                        data-test-id={TEST_IDS.CLEAR_FILTER_BUTTON}
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        variant='solid'
                        color='white'
                        bg='black'
                        h='48px'
                        onClick={handleSearch}
                        isDisabled={!filterSelected}
                        size='large'
                        data-test-id={TEST_IDS.FIND_RECIPE_BUTTON}
                        sx={{
                            pointerEvents: filterSelected ? 'auto' : 'none',
                        }}
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
