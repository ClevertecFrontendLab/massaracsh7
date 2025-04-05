import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import { newRecipes } from '~/data/cardsData';

import SliderCard from '../SliderCard/SliderCard';

const SliderList = () => (
    <Box as='section'>
        <Heading variant='sectionTitle'>Новые рецепты</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {newRecipes.map((recipe, index) => (
                <SliderCard key={index} {...recipe} />
            ))}
        </SimpleGrid>
    </Box>
);

export default SliderList;
