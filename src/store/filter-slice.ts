import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
    searchTerm: string;
    selectedAllergens: string[];
    excludeAllergens: boolean;
    selectedAuthors: string[];
    selectedCategories: string[];
    selectedMeat: string[];
    selectedSide: string[];
    hasResults: boolean | null;
};

const initialState: FiltersState = {
    searchTerm: '',
    selectedAllergens: [],
    excludeAllergens: false,
    selectedAuthors: [],
    selectedCategories: [],
    selectedMeat: [],
    selectedSide: [],
    hasResults: null,
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
            }
        },
        setSelectedAuthors(state, { payload }: PayloadAction<string[]>) {
            state.selectedAuthors = payload;
        },
        setSelectedCategories(state, { payload }: PayloadAction<string[]>) {
            state.selectedCategories = payload;
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
