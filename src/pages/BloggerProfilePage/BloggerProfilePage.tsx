import { Button } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { BloggerCard } from '~/components/Blogger/BloggerCard';
import { BloggerNotesSection } from '~/components/Blogger/BloggerNotesSection';
import { BlogSection } from '~/components/BlogSection/BlogSection';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { TEST_IDS } from '~/constants/test-ids';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetRecipesByUserIdQuery } from '~/query/services/recipes';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { handleBlogPageError } from '~/utils/handleBlogPageError';
import { is404Error } from '~/utils/isServerError';

export const BloggerProfilePage = () => {
    const { bloggerId } = useParams();
    const currentUserId = localStorage.getItem('userId');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

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

    const handleExpand = () => {
        setIsExpanded(true);
    };

    useEffect(() => {
        const err = bloggerError || recipesError;
        if (is404Error(bloggerError) || is404Error(recipesError)) {
            navigate(ROUTES_PATH.NOT_FOUND);
        } else if (isBloggerError || isRecipesError) {
            handleBlogPageError({ err, dispatch });
            dispatch(setAppLoader(false));
            navigate('/');
        }
    }, [isBloggerError, isRecipesError, bloggerError, recipesError, navigate, dispatch]);

    if (isBloggerLoading || isRecipesLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    return (
        <div>
            {blogger && <BloggerCard blogger={blogger} />}
            {data && (
                <>
                    <RecipeList recipes={isExpanded ? data.recipes : data.recipes.slice(0, 8)} />
                    {!isExpanded && data.recipes.length > 8 && (
                        <Button
                            data-test-id={TEST_IDS.LOAD_MORE_BUTTON}
                            onClick={handleExpand}
                            variant='limeSolid'
                            mt={4}
                            mx='auto'
                            display='block'
                        >
                            Загрузить ещё
                        </Button>
                    )}
                </>
            )}{' '}
            {data && data?.notes && <BloggerNotesSection notes={data?.notes} />}
            <BlogSection variant='fullProfile' />
        </div>
    );
};
