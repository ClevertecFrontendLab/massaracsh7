import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MIN_SEARCH_LENGTH } from '~/constants/constants';

import { ApplicationState } from './configure-store';

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
            state.selectedMeat = [];
            state.selectedSide = [];
        },
        setIsSearch(state, { payload }: PayloadAction<boolean>) {
            state.isSearch = payload;
        },
    },
});

export const {
    setSearchTerm,
    clearSearchTerm,
    setSelectedAllergens,
    toggleExcludeAllergens,
    setSelectedAuthors,
    setSelectedCategories,
    setSelectedMeat,
    setSelectedSide,
    setHasResults,
    resetAllFilters,
    setSelectedSubCategories,
    setIsSearch,
} = filtersSlice.actions;

export default filtersSlice.reducer;

const selectFiltersState = (state: ApplicationState) => state.filters;
export const selectSearchTerm = createSelector(
    [selectFiltersState],
    (filters) => filters.searchTerm,
);
export const selectSelectedAllergens = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedAllergens,
);
export const selectExcludeAllergens = createSelector(
    [selectFiltersState],
    (filters) => filters.excludeAllergens,
);
export const selectSelectedAuthors = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedAuthors,
);
export const selectSelectedCategories = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedCategories,
);
export const selectSelectedSubCategories = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedSubCategories,
);
export const selectSelectedMeat = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedMeat,
);
export const selectSelectedSide = createSelector(
    [selectFiltersState],
    (filters) => filters.selectedSide,
);
export const selectHasResults = createSelector(
    [selectFiltersState],
    (filters) => filters.hasResults,
);
export const selectIsSearch = createSelector([selectFiltersState], (filters) => filters.isSearch);

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
