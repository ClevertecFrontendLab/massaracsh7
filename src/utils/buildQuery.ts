import { RecipesParams } from '~/types/apiTypes';

export function buildQuery(params: {
    selectedAllergens?: string[];
    selectedSubCategories?: string[];
    selectedMeat?: string[];
    selectedSide?: string[];
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    page?: number;
}): RecipesParams {
    const query: RecipesParams = {};

    if (params.selectedAllergens?.length) {
        query.allergens = params.selectedAllergens.join(',');
    }

    if (params.selectedSubCategories?.length) {
        query.subcategoriesIds = params.selectedSubCategories.join(',');
    }

    if (params.selectedMeat?.length) {
        query.meat = params.selectedMeat.join(',');
    }

    if (params.selectedSide?.length) {
        query.garnish = params.selectedSide.join(',');
    }

    if (params.searchTerm) {
        query.searchString = params.searchTerm;
    }

    if (params.sortBy) {
        query.sortBy = params.sortBy;
    }

    if (params.sortOrder) {
        query.sortOrder = params.sortOrder;
    }

    if (params.limit !== undefined) {
        query.limit = params.limit;
    }

    if (params.page !== undefined) {
        query.page = params.page;
    }

    return query;
}
