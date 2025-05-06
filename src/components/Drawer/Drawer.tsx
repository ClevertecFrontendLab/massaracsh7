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

import { meatTypes, sideTypes } from '~/data/allergens';
import { authors } from '~/data/authors';
import { ApplicationState } from '~/store/configure-store';
import {
    resetAllFilters,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
    setSelectedSubCategories,
} from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';
import { Category } from '~/types/apiTypes';
import { MeatSide } from '~/types/typeCategory';

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
    const { category } = useParams();

    const allergens = useAppSelector((state: ApplicationState) => state.filters.selectedAllergens);
    const excludeAllergens = useAppSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );
    const { categories, subCategories } = useAppSelector(
        (state: ApplicationState) => state.categories,
    );

    const [filters, setFilters] = useState<FilterData>({
        categories: [],
        authors: [],
        meatTypes: [],
        sideTypes: [],
        excludeAllergens: excludeAllergens,
    });
    // useEffect(() => {
    //     if (isOpen) {
    //         setFilters({
    //             categories: [],
    //             authors: [],
    //             meatTypes: [],
    //             sideTypes: [],
    //             excludeAllergens: false,
    //         });
    //     }
    // }, [isOpen]);
    const categoryOptions = categories.map((item: Category) => item.title);
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
        const selectedCategoryIds = categories
            .filter((cat) => filters.categories.includes(cat.title))
            .map((cat) => cat._id);

        let selectedSubCategoryIds: string[] = [];

        if (category) {
            const matchedCategory = categories.find((cat) => cat.category === category);

            if (matchedCategory) {
                selectedSubCategoryIds = subCategories
                    .filter((sub) => sub.rootCategoryId === matchedCategory._id)
                    .map((sub) => sub._id);
            }
        } else {
            selectedSubCategoryIds = subCategories
                .filter((sub) => selectedCategoryIds.includes(sub.rootCategoryId))
                .map((sub) => sub._id);
        }

        dispatch(setSelectedAuthors(filters.authors));
        dispatch(setSelectedCategories(filters.categories));
        dispatch(setSelectedMeat(filters.meatTypes));
        dispatch(setSelectedSide(filters.sideTypes));
        dispatch(setSelectedSubCategories(selectedSubCategoryIds));
        onClose();
    };

    const filterSelected =
        filters.categories.length ||
        filters.authors.length ||
        filters.meatTypes.length ||
        filters.sideTypes.length ||
        allergens.length > 0;

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

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent
                position='relative'
                maxW={{ sm: '344px', md: '344px', lg: '463px', xl: '463px' }}
                p={{ sm: '4', md: '4', mid: '4', lg: '8', xl: '8' }}
                pr={{ sm: '5', md: '5', mid: '5', lg: '7', xl: '7' }}
                data-test-id='filter-drawer'
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
                        data-test-id='close-filter-drawer'
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
                                    {meatTypes.map((meat: MeatSide) => (
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
                                    {sideTypes.map((side: MeatSide) => (
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
                                data-test-id='allergens-switcher-filter'
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
                                {[
                                    ...filters.categories,
                                    ...filters.authors,
                                    ...filters.meatTypes.map((meat) => {
                                        const found = meatTypes.find((item) => item.value === meat);
                                        return found ? found.label : meat;
                                    }),
                                    ...filters.sideTypes.map((side) => {
                                        const found = sideTypes.find((item) => item.value === side);
                                        return found ? found.label : side;
                                    }),
                                    ...(filters.excludeAllergens && allergens.length > 0
                                        ? allergens
                                        : []),
                                ].map((tag) => (
                                    <Tag
                                        size='sm'
                                        key={tag}
                                        borderRadius='6px'
                                        bg='customLime.100'
                                        border='1px solid'
                                        borderColor='customLime.400'
                                        data-test-id='filter-tag'
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
                        isDisabled={!filterSelected}
                        size='large'
                        data-test-id='find-recipe-button'
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

export default FilterDrawer;
