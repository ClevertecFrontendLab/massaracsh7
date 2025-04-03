import { Box } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Header from '~/components/Header/Header';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <Box display='flex' flexDirection='column' height='100vh'>
        <Header />
        <Box display='flex' flex='1'>
            <Box width='256px' shadow='base' pt={6} pb={8}>
                <NavigationMenu />
            </Box>
            <Box flex='1' pt={8} py={6}>
                <Content>{children}</Content>
            </Box>
            <Box width='208px' bg='gray.100'>
                <Sidebar />
            </Box>
        </Box>
    </Box>
);

export default Layout;
