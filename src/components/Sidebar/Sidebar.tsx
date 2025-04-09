import { Box } from '@chakra-ui/react';

import CreateRecipeButton from '../CreateRecipeButton/CreateRecipeButton';
import SocialList from '../SocialList/SocialList';

const Sidebar = () => (
    <aside>
        <Box
            height='calc(100vh - 80px)'
            p='4'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            py={4}
            pr='56px'
            pl='66px'
        >
            <SocialList />

            <CreateRecipeButton />
        </Box>
    </aside>
);

export default Sidebar;
