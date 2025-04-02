import { Box } from '@chakra-ui/react';

import Content from '~/components/Content/Content';
import Header from '~/components/Header/Header';
import NavigationMenu from '~/components/NavigationMenu/NavigationMenu';
import Sidebar from '~/components/Sidebar/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <Box>
        <Header />
        <NavigationMenu />
        <Sidebar />
        <Content>{children}</Content>
    </Box>
);

export default Layout;
