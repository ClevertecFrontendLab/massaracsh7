import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Header = () => (
    <Box as='header' bg='#ffffd3' color='black' py={4}>
        <Box maxW='1920px' pl={4} pr={14} mx='auto'>
            <HStack justify='space-between' align='center'>
                <HStack spacing={32} align='center'>
                    <Box as='img' src='/logo.png' alt='Logo' h='32px' />
                    <Breadcrumbs />
                </HStack>
                <HStack spacing={3} px={6} align='center'>
                    <Avatar name='Екатерина Константинопольская' src='/avatar.png' w='48px' />
                    <Box>
                        <Text fontSize='18' fontWeight='500' lineHeight='1.6'>
                            Екатерина Константинопольская
                        </Text>
                        <Text fontSize='14' color='gray.400' lineHeight='1.6'>
                            @bake_and_pie
                        </Text>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    </Box>
);

export default Header;
