import { Card, CardBody, Text } from '@chakra-ui/react';

import { BloggerNote } from '~/types/bloggerTypes';
import { formatDate } from '~/utils/formatDate';

type BloggerNoteCardProps = {
    note: BloggerNote;
};
export const BloggerNoteCard = ({ note }: BloggerNoteCardProps) => (
    <Card
        variant='basic'
        w={{ base: '100%', sm: '100%', md: '244px', lg: '244px', xl: '244px' }}
        h={{ base: '100%', sm: '100%', md: '244px', lg: '244px', xl: '244px' }}
    >
        <CardBody
            p={{ base: '4', md: '4', lg: '4', xl: '6' }}
            pr={{ base: '4', md: '4', lg: '4', xl: '5' }}
        >
            <Text data-test-id='notes-card-date' color='customLime.600' pb={4}>
                {formatDate(note.date)}
            </Text>
            <Text data-test-id='notes-card-text'>{note.text}</Text>
        </CardBody>
    </Card>
);
