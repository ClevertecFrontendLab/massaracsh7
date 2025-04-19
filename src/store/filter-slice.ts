import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
    searchTerm: string;
    selectedAllergens: string[];
    excludeAllergens: boolean;
    selectedAuthors: string[];
    selectedCategories: string[];
    selectedMeat: string[];
    selectedSide: string[];
};

const initialState: FiltersState = {
    searchTerm: '',
    selectedAllergens: [],
    excludeAllergens: false,
    selectedAuthors: [],
    selectedCategories: [],
    selectedMeat: [],
    selectedSide: [],
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
        resetAllFilters(state) {
            Object.assign(state, initialState);
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
    resetAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
