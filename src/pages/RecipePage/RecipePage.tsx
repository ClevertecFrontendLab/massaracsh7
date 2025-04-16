import { Box, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { dishes } from '~/data/dishes';

const RecipePage = () => {
    const { id } = useParams();

    const recipe = dishes.find((item) => item.id === id);

    return (
        <Box>
            <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '12px', xl: '12px' }}>
                {recipe?.title}
            </Heading>
            <Box
                width={{ sm: '100%', md: '100%', lg: '700px', xl: '700px' }}
                mx='auto'
                mb={{ sm: '4', md: '4', lg: '8', xl: '8' }}
            >
                <Text textAlign='center' textStyle='descriptionText'>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
            </Box>
        </Box>
    );
};

export default RecipePage;
