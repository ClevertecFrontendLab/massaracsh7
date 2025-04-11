import { Avatar, Box, Hide, HStack, Show, Text } from '@chakra-ui/react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import SocialList from '../SocialList/SocialList';

const Header = () => (
    <Box as='header' bg='#ffffd3' py={4} data-test-id='header'>
        <Box
            maxW='1920px'
            pl={{ sm: '5', md: '5', lg: '4', xl: '4' }}
            pr={{ sm: '6', md: '6', lg: '14', xl: '14' }}
            mx='auto'
        >
            <HStack justify='space-between' align='center'>
                <HStack spacing={32} align='center'>
                    <Hide below='smPlus'>
                        <Box as='img' src='/logo.png' alt='Logo' h='32px' />
                    </Hide>
                    <Show below='smPlus'>
                        <Box as='img' src='/logo-mini.png' alt='Logo' h='32px' />
                    </Show>

                    <Hide below='mid'>
                        <Breadcrumbs />
                    </Hide>
                </HStack>
                <Hide below='mid'>
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
                <Show below='mid'>
                    <HStack spacing={{ sm: '6', md: '8' }}>
                        <SocialList />
                        <BurgerButton />
                    </HStack>
                </Show>
            </HStack>
        </Box>
    </Box>
);

export default Header;
