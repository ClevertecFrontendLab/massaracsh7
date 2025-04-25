import { Avatar, Box, Hide, HStack, Show, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import MobileMenu from '../MobileMenu/MobileMenu';
import SocialList from '../SocialList/SocialList';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Box
            as='header'
            bg={isMenuOpen ? 'white' : 'customLime.50'}
            mb={isMenuOpen ? '16px' : '8px'}
            py={4}
            data-test-id='header'
            w='100%'
        >
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
                            <Avatar
                                name='Екатерина Константинопольская'
                                src='/avatar.png'
                                w='48px'
                            />
                            <Box>
                                <Text textStyle='nameText'>Екатерина Константинопольская</Text>
                                <Text textStyle='miniText'>@bake_and_pie</Text>
                            </Box>
                        </HStack>
                    </Hide>
                    <Show below='mid'>
                        <HStack spacing={{ sm: 6, md: 8 }}>
                            {!isMenuOpen && <SocialList />}
                            <MobileMenu onOpenChange={setIsMenuOpen} />
                        </HStack>
                    </Show>
                </HStack>
            </Box>
        </Box>
    );
};

export default Header;
