import { createSelector } from '@reduxjs/toolkit';

import { ApplicationState } from '~/store/configure-store';
import { Category, CategorySub } from '~/types/apiTypes';

const selectCategoriesState = (state: ApplicationState) => state.categories;

export const selectAllCategories = createSelector(
    [selectCategoriesState],
    (state) => state.categories,
);

export const selectAllSubCategories = createSelector(
    [selectCategoriesState],
    (state) => state.subCategories,
);

export const selectCategoryBySlug = (slug: string) =>
    createSelector([selectAllCategories], (categories) =>
        categories.find((cat: Category) => cat.category === slug),
    );

export const selectSubCategoryBySlug = (slug: string) =>
    createSelector([selectAllSubCategories], (subcategories) =>
        subcategories.find((sub: CategorySub) => sub.category === slug),
    );

export const selectSubCategoriesByRootId = (rootId: string) =>
    createSelector([selectAllSubCategories], (subcategories) =>
        subcategories.filter((sub: CategorySub) => sub.rootCategoryId === rootId),
    );
