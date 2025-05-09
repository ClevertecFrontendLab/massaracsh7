import { HStack, Image, Text } from '@chakra-ui/react';

interface LikesAndCommentsInfoProps {
    likes?: number;
    bookmarks?: number;
    size?: string;
}

export const LikesInfo = ({ likes, bookmarks, size = 'limeSmall' }: LikesAndCommentsInfoProps) => {
    if (!likes && !bookmarks) return null;

    return (
        <HStack spacing={3.5} px={1} width='100%' justify='flex-end'>
            {bookmarks !== undefined && bookmarks > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />
                    <Text textStyle={size}>{bookmarks}</Text>
                </HStack>
            )}
            {likes !== undefined && likes > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                    <Text textStyle={size}>{likes}</Text>
                </HStack>
            )}
        </HStack>
    );
};
