import { HStack, Image, Stack, Text } from '@chakra-ui/react';

import BsBookmarkHeart from '~/assets/icons/BsBookmarkHeart.svg';
import BsEmojiHeartEyes from '~/assets/icons/BsEmojiHeartEyes.svg';
import BsPeopleFill from '~/assets/icons/BsPeopleFill.svg';

const userData = [
    { icon: BsBookmarkHeart, count: 185 },
    { icon: BsPeopleFill, count: 589 },
    { icon: BsEmojiHeartEyes, count: 587 },
];

export const SocialList = () => (
    <Stack
        direction={{ sm: 'row', md: 'row', mid: 'column', lg: 'column', xl: 'column' }}
        spacing={{ base: 4, mid: 4, lg: 6 }}
    >
        {userData.map((item, index) => (
            <HStack key={index} gap={2} py={{ base: 1, sm: 1, md: 1.5, lg: 2 }}>
                <Image
                    src={item.icon}
                    boxSize={{ base: '12px', sm: '12px', md: '12px', lg: '16px' }}
                />
                <Text
                    textStyle={{
                        base: 'limeSmall',
                        sm: 'limeSmall',
                        md: 'limeSmall',
                        lg: 'limeLg',
                    }}
                >
                    {item.count}
                </Text>
            </HStack>
        ))}
    </Stack>
);
