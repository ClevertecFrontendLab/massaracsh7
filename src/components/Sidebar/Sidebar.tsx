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
            alignItems='center'
            py={4}
        >
            <Box pr='56px' pl='66px'>
                <SocialList />
            </Box>

            <CreateRecipeButton />
        </Box>
    </aside>
);

export default Sidebar;
