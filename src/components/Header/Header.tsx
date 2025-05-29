import { Avatar, Box, Hide, HStack, Show, Text } from '@chakra-ui/react';
import { useState } from 'react';

import avatar from '~/assets/avatar.png';
import logo from '~/assets/logo.png';
import logoMini from '~/assets/logo-mini.png';
import { TEST_IDS } from '~/constants/test-ids';

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { SocialList } from '../SocialList/SocialList';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Box
            as='header'
            bg={isMenuOpen ? 'white' : 'customLime.50'}
            mb={isMenuOpen ? '16px' : '8px'}
            py={4}
            data-test-id={TEST_IDS.HEADER}
            w='100%'
            position='fixed'
            top={0}
            left={0}
            right={0}
            zIndex={10}
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
                            <Box
                                as='img'
                                src={logo}
                                alt='Logo'
                                h='32px'
                                data-test-id='header-logo'
                            />
                        </Hide>
                        <Show below='smPlus'>
                            <Box as='img' src={logoMini} alt='Logo' h='32px' />
                        </Show>

                        <Hide below='mid'>
                            <Breadcrumbs />
                        </Hide>
                    </HStack>
                    <Hide below='mid'>
                        <HStack spacing={3} px={6} align='center'>
                            <Avatar name='Екатерина Константинопольская' src={avatar} w='48px' />
                            <Box>
                                <Text textStyle='nameText'>Екатерина Константинопольская</Text>
                                <Text textStyle='miniText'>@bake_and_pie</Text>
                            </Box>
                        </HStack>
                    </Hide>
                    <HStack
                        spacing={{ sm: 6, md: 8 }}
                        display={{
                            base: 'none',
                            sm: 'flex',
                            md: 'flex',
                            mid: 'flex',
                            lg: 'none',
                            xl: 'none',
                        }}
                    >
                        {!isMenuOpen && <SocialList />}
                        <MobileMenu onOpenChange={setIsMenuOpen} />
                    </HStack>
                </HStack>
            </Box>
        </Box>
    );
};
