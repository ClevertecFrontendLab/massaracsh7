import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';

const userData = [
    { icon: '/icons/BsBookmarkHeart.svg', count: 185 },
    { icon: '/icons/BsPeopleFill.svg', count: 589 },
    { icon: '/icons/BsEmojiHeartEyes.svg', count: 587 },
];

const Sidebar = () => (
    <aside>
        <Box
            height='calc(100vh - 80px)'
            p='4'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            py={4}
            pr='56px'
            pl='66px'
        >
            <VStack spacing={6}>
                {userData.map((item, index) => (
                    <Button key={index} gap={2} width='86px' color='customLime.600' fontSize='lg'>
                        <Image src={item.icon} boxSize='16px' />
                        {item.count}
                    </Button>
                ))}
            </VStack>

            <Button>
                <VStack spacing={2}>
                    <Image src='/icons/IconPen.svg' boxSize='48px' />
                    <Text mt='2px' fontSize='sm' color='secondaryText'>
                        Записать рецепт
                    </Text>
                </VStack>
            </Button>
        </Box>
    </aside>
);

export default Sidebar;
