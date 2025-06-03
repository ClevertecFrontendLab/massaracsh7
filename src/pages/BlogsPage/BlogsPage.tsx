import { Box, Button, Center, Heading } from '@chakra-ui/react';

import { ArrowBlackRight } from '~/assets/icons/icons';
// import { BlogList } from "~/components/BlogList/BlogList";

export const BlogsPage = () => (
    <Box>
        <Heading variant='pageTitle' mb={8}>
            Кулинарные блоги
        </Heading>
        <Box
            pb={8}
            mb={6}
            borderRadius='0 0 8px 8px'
            width={{ base: '100%', md: '578px', xl: '898px' }}
            mx='auto'
            px={{ base: '16px', lg: '30px', xl: '190px' }}
        >
            <Heading variant='sectionTitle'>Избранные блоги</Heading>
        </Box>

        <>
            {/* <BlogList blogs={blogsToShow} /> */}
            <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                <Button
                    variant='limeSolid'
                    size='large'
                    mb={8}
                    mx='auto'
                    rightIcon={<ArrowBlackRight w='14px' />}
                    // onClick={() => }
                >
                    Вся подборка
                </Button>
            </Center>
        </>
    </Box>
);
