import { Box } from '@chakra-ui/react';

const Content = ({ children }: { children: React.ReactNode }) => (
    <Box as='main' pl={6} pr='72px'>
        {children}
    </Box>
);

export default Content;
