import { Button, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BloggerNote } from '~/types/bloggerTypes';

import { BloggerNotes } from './BloggerNotes';

type BloggerNotesProps = {
    notes: BloggerNote[];
};
export const BloggerNotesSection = ({ notes }: BloggerNotesProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    console.log(notes);
    const hasToggle = notes.length > 3;
    const visibleNotes = hasToggle && !isExpanded ? notes.slice(0, 3) : notes;

    const toggleExpand = () => setIsExpanded((prev) => !prev);

    useEffect(() => {
        if (window.location.hash === '#notes') {
            const el = document.getElementById('notes');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!notes.length) return null;

    return (
        <div id='notes'>
            <Heading variant='sectionBlogTitle' mb={4}>
                Заметки ({notes.length})
            </Heading>

            <VStack spacing={4} align='stretch'>
                <BloggerNotes notes={visibleNotes} />
            </VStack>

            {hasToggle && (
                <Button variant='ghost' onClick={toggleExpand} alignSelf='flex-start' mt={2}>
                    {isExpanded ? 'Свернуть' : 'Показать больше'}
                </Button>
            )}
        </div>
    );
};
