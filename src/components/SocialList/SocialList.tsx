import { HStack, Image, Stack, Text } from '@chakra-ui/react';

const userData = [
    { icon: '/icons/BsBookmarkHeart.svg', count: 185 },
    { icon: '/icons/BsPeopleFill.svg', count: 589 },
    { icon: '/icons/BsEmojiHeartEyes.svg', count: 587 },
];

const SocialList = () => (
    <Stack
        direction={{ base: 'row', md: 'row', lg: 'column', xl: 'column' }}
        spacing={{ base: '1', sm: '1', md: '1', lg: '6' }}
    >
        {userData.map((item, index) => (
            <HStack
                key={index}
                gap={1}
                px={{ base: '2', sm: '2', md: '2', lg: '4' }}
                py={{ base: '1', sm: '1', md: '1.5', lg: '2' }}
            >
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

export default SocialList;
