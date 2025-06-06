import { HStack, Image, Text } from '@chakra-ui/react';

import BsBookmarkHeart from '~/assets/icons/BsBookmarkHeart.svg';
import BsEmojiHeartEyes from '~/assets/icons/BsEmojiHeartEyes.svg';
import BsPeopleFill from '~/assets/icons/BsPeopleFill.svg';

type LikesAndCommentsInfoProps = {
    likes?: number;
    bookmarks?: number;
    subscribers?: number;
    size?: string;
};

export const LikesInfo = ({
    likes,
    bookmarks,
    subscribers,
    size = 'limeSmall',
}: LikesAndCommentsInfoProps) => {
    if (!likes && !bookmarks && !subscribers) return null;

    return (
        <HStack spacing={3.5} px={1} width='100%' justify='flex-end'>
            {bookmarks !== undefined && bookmarks > 0 && (
                <HStack spacing={1} data-test-id='blogger-followers-bookmarks'>
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
            {subscribers !== undefined && subscribers > 0 && (
                <HStack spacing={1} data-test-id='blogger-followers-count'>
                    <Image src={BsPeopleFill} boxSize='12px' />
                    <Text textStyle={size}>{subscribers}</Text>
                </HStack>
            )}
        </HStack>
    );
};
