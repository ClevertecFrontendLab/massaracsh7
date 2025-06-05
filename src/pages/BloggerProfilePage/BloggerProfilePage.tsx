import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'react-router';

import { BloggerCard } from '~/components/Blogger/BloggerCard';
import { BloggerNotesSection } from '~/components/Blogger/BloggerNotesSection';
import { RecipeList } from '~/components/RecipeList/RecipeList';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetRecipesByUserIdQuery } from '~/query/services/recipes';

export const BloggerProfilePage = () => {
    const { bloggerId } = useParams();
    const currentUserId = localStorage.getItem('userId');
    const {
        data: blogger,
        // isLoading: isBloggerLoading,
    } = useGetBloggerByIdQuery(
        !bloggerId || !currentUserId
            ? skipToken
            : { bloggerId: bloggerId, currentUserId: currentUserId },
    );

    const {
        data: recipes,
        // isLoading: isRecipesLoading,
    } = useGetRecipesByUserIdQuery(bloggerId || skipToken);

    console.log(blogger);
    return (
        <div>
            {blogger && <BloggerCard blogger={blogger} />}
            {recipes && <RecipeList recipes={recipes?.recipes} />}
            <div id='notes'>
                {blogger && blogger.notes && <BloggerNotesSection notes={blogger.notes} />}
            </div>
        </div>
    );
};
