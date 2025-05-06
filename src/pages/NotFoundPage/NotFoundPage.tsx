import { Box, Heading, Hide, HStack, Image, Link, Show, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

const NotFoundPage = () => (
    <>
        <Box
            as='header'
            bg='customLime.50'
            py={4}
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
                <HStack align='center'>
                    <Hide below='smPlus'>
                        <Box as='img' src='/logo.png' alt='Logo' h='32px' />
                    </Hide>
                    <Show below='smPlus'>
                        <Box as='img' src='/logo-mini.png' alt='Logo' h='32px' />
                    </Show>
                </HStack>
            </Box>
        </Box>
        <Box
            pt='80px'
            minH='calc(100vh - 80px)'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Box
                maxW={{
                    base: '316px',
                    md: '316px',
                    lg: '396px',
                    xl: '396px',
                }}
                p={8}
                w='100%'
            >
                <VStack textAlign='center' spacing={4}>
                    <Image
                        src='/images/404.png'
                        w={{ base: '108px', lg: '206px', xl: '206px' }}
                        h={{ base: '108px', lg: '206px', xl: '206px' }}
                        mb={4}
                    />
                    <Heading as='h1' fontSize='24px' lineHeight='32px' fontWeight='700'>
                        Упс! Такой страницы нет
                    </Heading>
                    <Text fontSize='16px' lineHeight='24px' color='secondaryText'>
                        Можете поискать другой рецепт{' '}
                        <Link
                            as={RouterLink}
                            to='/'
                            textDecoration='underline'
                            data-test-id='error-page-go-home'
                        >
                            здесь
                        </Link>
                        .
                    </Text>
                </VStack>
            </Box>
        </Box>
    </>
);

export default NotFoundPage;
