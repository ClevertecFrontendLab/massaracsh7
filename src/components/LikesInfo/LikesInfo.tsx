import { HStack, Image, Text } from '@chakra-ui/react';

import BsBookmarkHeart from '~/assets/icons/BsBookmarkHeart.svg';
import BsEmojiHeartEyes from '~/assets/icons/BsEmojiHeartEyes.svg';

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
                    <Image src={BsBookmarkHeart} boxSize='12px' />
                    <Text textStyle={size}>{bookmarks}</Text>
                </HStack>
            )}
            {likes !== undefined && likes > 0 && (
                <HStack spacing={1}>
                    <Image src={BsEmojiHeartEyes} boxSize='12px' />
                    <Text textStyle={size}>{likes}</Text>
                </HStack>
            )}
        </HStack>
    );
};
