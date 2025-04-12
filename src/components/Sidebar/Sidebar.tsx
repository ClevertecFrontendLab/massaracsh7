import { Box } from '@chakra-ui/react';

import CreateRecipeButton from '../CreateRecipeButton/CreateRecipeButton';
import SocialList from '../SocialList/SocialList';

const Sidebar = () => (
    <aside>
        <Box
            height='calc(100vh - 80px)'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='flex-start'
            py={4}
        >
            <Box pl='82px'>
                <SocialList />
            </Box>

            <CreateRecipeButton />
        </Box>
    </aside>
);

export default Sidebar;
