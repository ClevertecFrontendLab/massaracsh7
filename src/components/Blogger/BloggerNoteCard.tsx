import { Card, CardBody, Text } from '@chakra-ui/react';

import { BloggerNote } from '~/types/bloggerTypes';

type BloggerNoteCardProps = {
    note: BloggerNote;
};
export const BloggerNoteCard = ({ note }: BloggerNoteCardProps) => (
    <Card variant='basic'>
        <CardBody
            p={{ base: '4', md: '4', lg: '4', xl: '6' }}
            pr={{ base: '4', md: '4', lg: '4', xl: '5' }}
        >
            <Text data-test-id='notes-card-date'>{note.date}</Text>
            <Text data-test-id='notes-card-text'>{note.text}</Text>
        </CardBody>
    </Card>
);
