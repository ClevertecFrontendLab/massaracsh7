import { createSelector } from '@reduxjs/toolkit';

import { MIN_SEARCH_LENGTH } from '~/constants/constants';
import { ApplicationState } from '~/store/configure-store';

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
