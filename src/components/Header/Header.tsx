import { Avatar, Box, Hide, HStack, Show, Text } from '@chakra-ui/react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import SocialList from '../SocialList/SocialList';

const Header = () => (
    <Box as='header' bg='#ffffd3' color='black' py={4}>
        <Box maxW='1920px' pl={4} pr={14} mx='auto'>
            <HStack justify='space-between' align='center'>
                <HStack spacing={32} align='center'>
                    <Hide below='sm'>
                        <Box as='img' src='/logo.png' alt='Logo' h='32px' />
                    </Hide>
                    <Show below='sm'>
                        <Box as='img' src='/logo-mini.png' alt='Logo' h='32px' />
                    </Show>

                    <Hide below='md'>
                        <Breadcrumbs />
                    </Hide>
                </HStack>
                <Hide below='md'>
                    <HStack spacing={3} px={6} align='center'>
                        <Avatar name='Екатерина Константинопольская' src='/avatar.png' w='48px' />
                        <Box>
                            <Text fontSize='18px' fontWeight='500' lineHeight='28px'>
                                Екатерина Константинопольская
                            </Text>
                            <Text fontSize='14px' color='gray.400' lineHeight='1.6'>
                                @bake_and_pie
                            </Text>
                        </Box>
                    </HStack>
                </Hide>
                <Show below='md'>
                    <HStack>
                        <SocialList />
                        <BurgerButton />
                    </HStack>
                </Show>
            </HStack>
        </Box>
    </Box>
);

export default Header;
