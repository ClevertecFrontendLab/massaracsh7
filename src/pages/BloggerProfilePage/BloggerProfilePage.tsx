import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { BloggerCard } from '~/components/Blogger/BloggerCard';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';

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

    useEffect(() => {
        if (window.location.hash === '#notes') {
            const el = document.getElementById('notes');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    console.log(blogger);
    return (
        <div>
            {blogger && <BloggerCard blogger={blogger} />}
            <div id='notes'>Заметки</div>
        </div>
    );
};
