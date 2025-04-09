import { Box, Hide, Show } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <Box display='flex' flexDirection='column' height='100vh' pb={{ mb: '84px', lg: '0', xl: '0' }}>
        <Header />
        <Box
            display='flex'
            flex='1'
            maxW='1920px'
            mx='auto'
            height='calc(100vh - 80px)'
            overflowY='auto'
        >
            <Hide below='md'>
                <Box width='256px' shadow='base' pt={6} pb={8} position='sticky' top={0}>
                    <NavigationMenu />
                    <Footer />
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
            <Box
                position='fixed'
                bottom={0}
                left={0}
                right={0}
                height='84px'
                zIndex={10}
                background='white'
            >
                <Footer />
            </Box>
        </Show>
    </Box>
);

export default Layout;
