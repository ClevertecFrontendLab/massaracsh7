import { Blogger, BloggersResponse } from '~/types/bloggerTypes';

import { ApiEndpoints } from '../constants/api';
import { ApiGroupNames } from '../constants/api-group-names';
import { EndpointNames } from '../constants/endpoint-names';
import { Tags } from '../constants/tags';
import { catalogApiSlice } from '../create-api';

export const bloggersApiSlice = catalogApiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.BLOGGERS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBloggers: builder.query<BloggersResponse, { currentUserId: string; limit?: string }>(
                {
                    query: ({ currentUserId, limit }) => ({
                        url: ApiEndpoints.BLOGGERS,
                        method: 'GET',
                        params: {
                            currentUserId,
                            limit,
                        },
                        apiGroupName: ApiGroupNames.BLOGGERS,
                        name: EndpointNames.GET_BLOGGERS,
                    }),
                    providesTags: [Tags.BLOGGERS],
                },
            ),

            getBloggerById: builder.query<Blogger, { bloggerId: string; currentUserId: string }>({
                query: ({ bloggerId, currentUserId }) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${bloggerId}`,
                    method: 'GET',
                    params: {
                        currentUserId,
                    },
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                }),
                providesTags: [Tags.BLOGGERS],
            }),
        }),
    });

export const { useGetBloggersQuery, useGetBloggerByIdQuery } = bloggersApiSlice;
