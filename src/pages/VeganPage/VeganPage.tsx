import { Box, Heading, Text } from '@chakra-ui/react';

import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';

const VeganPage = () => (
    <Box>
        <Heading variant='pageTitle' mb={8} pt={1.5}>
            Веганская кухня
        </Heading>
        <Box width='700px' mx='auto' mb={8}>
            <Text textAlign='center'>
                Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                вегетарианскую диету и готовить вкусные вегетарианские блюда.
            </Text>
        </Box>
        <SearchBar />
        <TabsCategory />
    </Box>
);

export default VeganPage;
