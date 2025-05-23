import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MIN_SEARCH_LENGTH } from '~/constants/constants';

export interface FiltersState {
    searchTerm: string;
    selectedAllergens: string[];
    excludeAllergens: boolean;
    selectedAuthors: string[];
    selectedCategories: string[];
    selectedSubCategories: string[];
    selectedMeat: string[];
    selectedSide: string[];
    hasResults: boolean | null;
    isSearch: boolean;
}

const initialState: FiltersState = {
    searchTerm: '',
    selectedAllergens: [],
    excludeAllergens: false,
    selectedAuthors: [],
    selectedCategories: [],
    selectedSubCategories: [],
    selectedMeat: [],
    selectedSide: [],
    hasResults: null,
    isSearch: false,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm(state, { payload }: PayloadAction<string>) {
            state.searchTerm = payload;
        },
        clearSearchTerm(state) {
            state.searchTerm = '';
        },
        setSelectedAllergens(state, { payload }: PayloadAction<string[]>) {
            state.selectedAllergens = payload;
        },
        toggleExcludeAllergens(state) {
            state.excludeAllergens = !state.excludeAllergens;
            if (!state.excludeAllergens) {
                state.selectedAllergens = [];
                state.isSearch = false;
            }
        },
        setSelectedAuthors(state, { payload }: PayloadAction<string[]>) {
            state.selectedAuthors = payload;
        },
        setSelectedCategories(state, { payload }: PayloadAction<string[]>) {
            state.selectedCategories = payload;
        },
        setSelectedSubCategories(state, { payload }: PayloadAction<string[]>) {
            state.selectedSubCategories = payload;
        },
        setSelectedMeat(state, { payload }: PayloadAction<string[]>) {
            state.selectedMeat = payload;
        },
        setSelectedSide(state, { payload }: PayloadAction<string[]>) {
            state.selectedSide = payload;
        },
        setHasResults(state, { payload }: PayloadAction<boolean | null>) {
            state.hasResults = payload;
        },
        resetAllFilters(state) {
            state.selectedAllergens = [];
            state.excludeAllergens = false;
            state.selectedAuthors = [];
            state.selectedCategories = [];
            state.selectedSubCategories = [];
            state.selectedMeat = [];
            state.selectedSide = [];
        },
        setIsSearch(state, { payload }: PayloadAction<boolean>) {
            state.isSearch = payload;
        },
    },
    selectors: {
        selectSearchTerm: (state) => state.searchTerm,
        selectSelectedAllergens: (state) => state.selectedAllergens,
        selectExcludeAllergens: (state) => state.excludeAllergens,
        selectSelectedAuthors: (state) => state.selectedAuthors,
        selectSelectedCategories: (state) => state.selectedCategories,
        selectSelectedSubCategories: (state) => state.selectedSubCategories,
        selectSelectedMeat: (state) => state.selectedMeat,
        selectSelectedSide: (state) => state.selectedSide,
        selectHasResults: (state) => state.hasResults,
        selectIsSearch: (state) => state.isSearch,
    },
});

export const {
    setSearchTerm,
    clearSearchTerm,
    setSelectedAllergens,
    toggleExcludeAllergens,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedSubCategories,
    setSelectedMeat,
    setSelectedSide,
    setHasResults,
    resetAllFilters,
    setIsSearch,
} = filtersSlice.actions;

export const {
    selectSearchTerm,
    selectSelectedAllergens,
    selectExcludeAllergens,
    selectSelectedAuthors,
    selectSelectedCategories,
    selectSelectedSubCategories,
    selectSelectedMeat,
    selectSelectedSide,
    selectHasResults,
    selectIsSearch,
} = filtersSlice.selectors;

export const selectTotalFilterCount = createSelector(
    [
        selectSelectedAllergens,
        selectSelectedAuthors,
        selectSelectedCategories,
        selectSelectedSubCategories,
        selectSelectedMeat,
        selectSelectedSide,
    ],
    (allergens, authors, categories, subCategories, meat, side) =>
        allergens.length +
        authors.length +
        categories.length +
        subCategories.length +
        meat.length +
        side.length,
);

export const selectHasAnyFilter = createSelector([selectTotalFilterCount], (count) => count > 0);

export const selectIsExcludingAllergensWithTags = createSelector(
    [selectExcludeAllergens, selectSelectedAllergens],
    (exclude, allergens) => exclude && allergens.length > 0,
);

export const selectFilterTags = createSelector(
    [
        selectSelectedCategories,
        selectSelectedAuthors,
        selectSelectedMeat,
        selectSelectedSide,
        selectSelectedAllergens,
    ],
    (categories, authors, meat, side, allergens) => [
        ...categories,
        ...authors,
        ...meat,
        ...side,
        ...allergens,
    ],
);

export const selectHasFiltersOrSearch = createSelector(
    [selectHasAnyFilter, selectSearchTerm],
    (hasFilters, searchTerm) => hasFilters || searchTerm.length >= MIN_SEARCH_LENGTH,
);

export default filtersSlice.reducer;
