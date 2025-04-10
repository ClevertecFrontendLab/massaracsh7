import { Box, Hide, Show } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import NavigationFooter from '~/components/NavigationFooter/NavigationFooter';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <Box
        display='flex'
        flexDirection='column'
        pb={{ base: '84px', sm: '96px', md: '104px', lg: '0', xl: '0' }}
        minHeight='100vh'
    >
        <Header />
        <Box display='flex' flex='1' maxW='1920px' mx='auto' height='calc(100vh - 80px)'>
            <Hide below='md'>
                <Box width='256px' shadow='base' pt={6} pb={8} position='sticky' top={0}>
                    <NavigationMenu />
                    <NavigationFooter />
                </Box>
            </Hide>
            <Box flex='1' pt={8} py={6}>
                <Content>{children}</Content>
            </Box>
            <Hide below='md'>
                <Box width='208px' position='sticky' top={0}>
                    <Sidebar />
                </Box>
            </Hide>
        </Box>

        <Show below='md'>
            <Footer />
        </Show>
    </Box>
);

export default Layout;
