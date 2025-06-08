import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BloggerNote } from '~/types/bloggerTypes';

import { BloggerNotes } from './BloggerNotes';

type BloggerNotesProps = {
    notes: BloggerNote[];
};
export const BloggerNotesSection = ({ notes }: BloggerNotesProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasToggle = notes.length > 3;

    const toggleExpand = () => setIsExpanded((prev) => !prev);

    useEffect(() => {
        if (window.location.hash === '#notes') {
            const el = document.getElementById('notes');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!notes.length) return null;

    return (
        <Box id='notes' data-test-id='blog-notes-box'>
            <Heading variant='sectionBlogTitle' mb={4}>
                Заметки <Text data-test-id='blogger-user-notes-count'>({notes.length})</Text>
            </Heading>

            <BloggerNotes notes={notes} isExpanded={isExpanded} maxVisible={3} />

            {hasToggle && (
                <Button
                    variant='ghost'
                    onClick={toggleExpand}
                    alignSelf='flex-start'
                    mt={2}
                    data-test-id='blogger-user-notes-button'
                >
                    {isExpanded ? 'Свернуть' : 'Показать больше'}
                </Button>
            )}
        </Box>
    );
};
