import {
    CreateRecipeDto,
    MeasureUnit,
    Recipe,
    RecipeDraftDto,
    RecipesByCategoryParams,
    RecipesParams,
    RecipesResponse,
    UpdateRecipeDto,
    UploadResponse,
} from '~/types/apiTypes';

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
            createRecipe: builder.mutation<Recipe, CreateRecipeDto>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
            createRecipeDraft: builder.mutation<Recipe, RecipeDraftDto>({
                query: (body) => ({
                    url: `${ApiEndpoints.RECIPES}/draft`,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE_DRAFT,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
            editRecipe: builder.mutation<Recipe, { id: string; data: UpdateRecipeDto }>({
                query: ({ id, data }) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'PATCH',
                    body: data,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.EDIT_RECIPE,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),

            getMeasureUnits: builder.query<MeasureUnit[], void>({
                query: () => ({
                    url: ApiEndpoints.MEASURE_UNITS,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_MEASURE_UNITS,
                }),
                providesTags: [Tags.RECIPES],
            }),
            uploadFile: builder.mutation<UploadResponse, File>({
                query: (file: string | Blob) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    return {
                        url: '/file/upload',
                        method: 'POST',
                        body: formData,
                        apiGroupName: ApiGroupNames.RECIPES,
                        name: EndpointNames.UPLOAD_FILE,
                    };
                },
            }),
            deleteRecipe: builder.mutation<{ message: string }, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.DELETE_RECIPE,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),

            toggleLikeRecipe: builder.mutation<{ message: string; likes: number }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}/like`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.TOGGLE_LIKE_RECIPE,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),

            toggleBookmarkRecipe: builder.mutation<{ message: string; bookmarks: number }, string>({
                query: (recipeId) => ({
                    url: `${ApiEndpoints.RECIPES}/${recipeId}/bookmark`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.TOGGLE_BOOKMARK_RECIPE,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
        }),
        overrideExisting: false,
    });

export const {
    useGetRecipesQuery,
    useCreateRecipeDraftMutation,
    useGetRecipesPagesInfiniteQuery,
    useGetRecipesByCategoryQuery,
    useLazyGetRecipesByCategoryQuery,
    useGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useUploadFileMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
    useToggleLikeRecipeMutation,
    useToggleBookmarkRecipeMutation,
} = recipesApiSlice;
