import { Category } from '~/types/apiTypes';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { catalogSlice } from '../create-api';

export const categoriesApiSlice = catalogSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORIES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<Category[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORIES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                providesTags: [Tags.CATEGORIES],
            }),
            getCategoryById: builder.query<Category, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.CATEGORIES}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORY_BY_ID,
                }),
                providesTags: [Tags.CATEGORIES],
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoriesApiSlice;
