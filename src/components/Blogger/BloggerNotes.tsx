import { Box, SimpleGrid } from '@chakra-ui/react';

import { BloggerNote } from '~/types/bloggerTypes';

import { BloggerNoteCard } from './BloggerNoteCard';

type BloggerNotesProps = {
    notes: BloggerNote[];
    isExpanded: boolean;
    maxVisible: number;
};

export const BloggerNotes = ({ notes, isExpanded, maxVisible }: BloggerNotesProps) => (
    <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 3, md: 3, lg: 4, xl: 4 }}
        data-test-id='blogger-user-notes-grid'
    >
        {notes.map((note, index) => (
            <Box key={index} display={isExpanded || index < maxVisible ? 'block' : 'none'}>
                <BloggerNoteCard note={note} />
            </Box>
        ))}
    </SimpleGrid>
);
