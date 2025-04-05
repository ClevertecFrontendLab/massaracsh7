import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';

import { newRecipes } from '~/data/cardsData';

import SliderCard from '../SliderCard/SliderCard';

const SliderList = () => (
    <Box as='section' position='relative' mb={12}>
        <Heading variant='sectionTitle' mb={6}>
            Новые рецепты
        </Heading>
        <IconButton
            aria-label='Previous'
            icon={<ArrowBackIcon />}
            position='absolute'
            width='48px'
            height='48px'
            top='50%'
            left='-10px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={1}
            _hover={{ bg: 'gray.700' }}
        />

        <IconButton
            aria-label='Next'
            icon={<ArrowForwardIcon />}
            position='absolute'
            width='48px'
            height='48px'
            top='50%'
            right='40px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={1}
            _hover={{ bg: 'gray.700' }}
        />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {newRecipes.map((recipe, index) => (
                <SliderCard key={index} {...recipe} />
            ))}
        </SimpleGrid>
    </Box>
);

export default SliderList;
