import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';

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
                <Button gap={2} width='86px' color='customLime.600' fontSize='lg'>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='16px' />
                    185
                </Button>

                <Button gap={2} width='86px' color='customLime.600' fontSize='lg'>
                    <Image src='/icons/BsPeopleFill.svg' boxSize='16px' />
                    589
                </Button>
                <Button gap={2} width='86px' color='customLime.600' fontSize='lg'>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='16px' />
                    587
                </Button>
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
