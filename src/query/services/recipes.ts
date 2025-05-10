import { Recipe, RecipesByCategoryParams, RecipesParams, RecipesResponse } from '~/types/apiTypes';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { catalogApiSlice } from '../create-api';

export const recipesApiSlice = catalogApiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipesResponse, RecipesParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    params,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),

            getRecipesPages: builder.infiniteQuery<RecipesResponse, RecipesParams, number>({
                infiniteQueryOptions: {
                    initialPageParam: 1,
                    getNextPageParam: (lastPage) =>
                        lastPage.meta.page < lastPage.meta.totalPages
                            ? lastPage.meta.page + 1
                            : undefined,
                },
                query({ queryArg, pageParam }) {
                    return {
                        url: ApiEndpoints.RECIPES,
                        method: 'GET',
                        params: {
                            ...queryArg,
                            page: pageParam,
                            limit: queryArg.limit,
                        },
                        apiGroupName: ApiGroupNames.RECIPES,
                        name: EndpointNames.GET_RECIPES,
                    };
                },
                providesTags: [Tags.RECIPES],
            }),

            getRecipesByCategory: builder.query<RecipesResponse, RecipesByCategoryParams>({
                query: ({ id, ...params }) => ({
                    url: `${ApiEndpoints.RECIPES_BY_CATEGORY}/${id}`,
                    method: 'GET',
                    params,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_BY_CATEGORY,
                }),
                providesTags: [Tags.RECIPES],
            }),

            getRecipeById: builder.query<Recipe, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPE_BY_ID,
                }),
                providesTags: [Tags.RECIPES],
            }),
        }),
        overrideExisting: false,
    });

export const {
    useGetRecipesQuery,
    useGetRecipesPagesInfiniteQuery,
    useGetRecipesByCategoryQuery,
    useLazyGetRecipesByCategoryQuery,
    useGetRecipeByIdQuery,
} = recipesApiSlice;
