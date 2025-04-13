import { HStack, Image, Text } from '@chakra-ui/react';

interface LikesAndCommentsInfoProps {
    likes?: number;
    comments?: number;
}

const LikesInfo = ({ likes, comments }: LikesAndCommentsInfoProps) => {
    if (!likes && !comments) return null;

    return (
        <HStack spacing={3.5} px={1}>
            {likes !== undefined && likes > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />
                    <Text textStyle='limeSmall'>{likes}</Text>
                </HStack>
            )}
            {comments !== undefined && comments > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                    <Text textStyle='limeSmall'>{comments}</Text>
                </HStack>
            )}
        </HStack>
    );
};

export default LikesInfo;
