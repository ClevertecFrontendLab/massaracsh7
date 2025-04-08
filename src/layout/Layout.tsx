import { Box, useBreakpointValue } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });
    const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

    return (
        <Box>
            <Box
                as='header'
                position={isMobile ? 'fixed' : 'static'}
                top={0}
                left={0}
                right={0}
                zIndex={10}
                height={isMobile ? '64px' : 'auto'}
            >
                <Header />
            </Box>

            <Box
                display='flex'
                flexDirection='row'
                maxW='1920px'
                mx='auto'
                pt={isMobile ? '64px' : 0}
                pb={isMobile ? '84px' : 0}
                height={isMobile ? 'auto' : 'calc(100vh - 80px)'}
                overflowY={isMobile ? 'visible' : 'auto'}
            >
                {isDesktop && (
                    <Box
                        width='256px'
                        shadow='base'
                        pt='34px'
                        pb={8}
                        pr={1}
                        position='sticky'
                        top={0}
                    >
                        <NavigationMenu />
                        <Footer />
                    </Box>
                )}

                <Box flex='1' pt={8} py={6}>
                    <Content>{children}</Content>
                </Box>

                {isDesktop && (
                    <Box width='208px' position='sticky' top={0}>
                        <Sidebar />
                    </Box>
                )}
            </Box>

            {isMobile && (
                <Box
                    as='footer'
                    position='fixed'
                    bottom={0}
                    left={0}
                    right={0}
                    height='84px'
                    zIndex={10}
                >
                    <Footer />
                </Box>
            )}
        </Box>
    );
};

export default Layout;
