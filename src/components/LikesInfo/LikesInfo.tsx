import { HStack, Image, Text } from '@chakra-ui/react';

interface LikesAndCommentsInfoProps {
    likes?: number;
    comments?: number;
    size?: string;
}

const LikesInfo = ({ likes, comments, size = 'limeSmall' }: LikesAndCommentsInfoProps) => {
    if (!likes && !comments) return null;

    return (
        <HStack spacing={3.5} px={1} width='100%' justify='flex-end'>
            {likes !== undefined && likes > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />
                    <Text textStyle={size}>{likes}</Text>
                </HStack>
            )}
            {comments !== undefined && comments > 0 && (
                <HStack spacing={1}>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                    <Text textStyle={size}>{comments}</Text>
                </HStack>
            )}
        </HStack>
    );
};

export default LikesInfo;
