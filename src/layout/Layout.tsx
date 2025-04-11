import { Box, Hide, Show } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import NavigationFooter from '~/components/NavigationFooter/NavigationFooter';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Box position='fixed' top={0} left={0} right={0} zIndex={10}>
            <Header />
        </Box>

        <Box
            pt='80px'
            pb={{ base: '84px', sm: '96px', md: '104px', lg: '0', xl: '0' }}
            maxW='1920px'
            mx='auto'
            display='flex'
        >
            <Hide below='mid'>
                <Box
                    position='fixed'
                    top='80px'
                    left={0}
                    width='256px'
                    height='calc(100vh - 80px)'
                    shadow='base'
                    pt={9}
                    pb={8}
                >
                    <NavigationMenu />
                    <NavigationFooter />
                </Box>
            </Hide>

            <Box
                flex='1'
                ml={{ mid: '256px', lg: '256px', xl: '256px' }}
                mr={{ mid: '208px', lg: '208px', xl: '256px' }}
                pt={{ md: '0', lg: '8', xl: '8' }}
                pb={6}
            >
                <Content>{children}</Content>
            </Box>

            <Hide below='mid'>
                <Box
                    position='fixed'
                    top='80px'
                    right={0}
                    width='208px'
                    height='calc(100vh - 80px)'
                    overflowY='auto'
                >
                    <Sidebar />
                </Box>
            </Hide>
        </Box>

        <Show below='mid'>
            <Box position='fixed' bottom={0} left={0} right={0} zIndex={10}>
                <Footer />
            </Box>
        </Show>
    </>
);

export default Layout;
