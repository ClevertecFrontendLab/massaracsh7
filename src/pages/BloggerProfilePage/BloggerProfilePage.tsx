import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { BloggerCard } from '~/components/Blogger/BloggerCard';
import { BloggerNotesSection } from '~/components/Blogger/BloggerNotesSection';
import { BlogSection } from '~/components/BlogSection/BlogSection';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetRecipesByUserIdQuery } from '~/query/services/recipes';
import { setAppAlert } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const BloggerProfilePage = () => {
    const { bloggerId } = useParams();
    const currentUserId = localStorage.getItem('userId');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        data: blogger,
        isLoading: isBloggerLoading,
        isError: isBloggerError,
        error: bloggerError,
    } = useGetBloggerByIdQuery(
        !bloggerId || !currentUserId
            ? skipToken
            : { bloggerId: bloggerId, currentUserId: currentUserId },
    );

    const {
        data: data,
        isLoading: isRecipesLoading,
        isError: isRecipesError,
        error: recipesError,
    } = useGetRecipesByUserIdQuery(bloggerId || skipToken);

    useEffect(() => {
        const is404 = (err: unknown) =>
            err && typeof err === 'object' && 'status' in err && err.status === 404;

        if (is404(bloggerError) || is404(recipesError)) {
            navigate('/not-found');
        } else if (isBloggerError || isRecipesError) {
            dispatch(
                setAppAlert({
                    type: 'error',
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже.',
                    sourse: 'global',
                }),
            );
            navigate('/');
        }
    }, [isBloggerError, isRecipesError, bloggerError, recipesError, navigate, dispatch]);

    if (isBloggerLoading || isRecipesLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    return (
        <div>
            {blogger && <BloggerCard blogger={blogger} variantCard='blog' />}
            {data && <RecipeList recipes={data?.recipes} />}
            {data && data?.notes && <BloggerNotesSection notes={data?.notes} />}
            <BlogSection variant='fullProfile' />
        </div>
    );
};
