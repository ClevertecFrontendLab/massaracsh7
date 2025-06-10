import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { TEST_IDS } from '~/constants/test-ids';
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
        <Box
            id='notes'
            data-test-id={TEST_IDS.BLOG_NOTES_BOX}
            bg='rgba(0, 0, 0, 0.04)'
            p={4}
            borderRadius='16px'
        >
            <Heading as='h2' variant='sliderTitle' mb={4}>
                Заметки &nbsp;{' '}
                <Text as='span' data-test-id={TEST_IDS.BLOGGER_USER_NOTES_COUNT} color='grayText'>
                    ({notes.length})
                </Text>
            </Heading>

            <BloggerNotes notes={notes} isExpanded={isExpanded} maxVisible={3} />

            {hasToggle && (
                <Center mt={2}>
                    <Button
                        variant='ghost'
                        onClick={toggleExpand}
                        alignItems='center'
                        data-test-id={TEST_IDS.BLOGGER_USER_NOTES_BUTTON}
                    >
                        {isExpanded ? 'Свернуть' : 'Показать больше'}
                    </Button>
                </Center>
            )}
        </Box>
    );
};
