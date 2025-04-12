import { Box, Flex, Heading, Hide, IconButton } from '@chakra-ui/react';

import { ArrowLeft, ArrowRight } from '~/assets/icons/icons';
import { newRecipes } from '~/data/cardsData';

import SliderCard from '../SliderCard/SliderCard';

const SliderList = () => (
    <Box
        as='section'
        position='relative'
        mb={{ sm: '30px', md: '30px', lg: '40px', xl: '44px' }}
        w='100%'
    >
        <Heading variant='sectionTitle' mb={{ sm: 3, md: 3, lg: 6, xl: 6 }}>
            Новые рецепты
        </Heading>
        <Hide below='mid'>
            <IconButton
                aria-label='Previous'
                icon={<ArrowLeft w='24px' />}
                position='absolute'
                width={{ base: '40px', lg: '40px', xl: '48px' }}
                height={{ base: '40px', lg: '40px', xl: '48px' }}
                top='50%'
                left='-6px'
                transform='translateY(-50%)'
                bg='black'
                color='customLime.50'
                borderRadius='small'
                zIndex={1}
            />
        </Hide>
        <Hide below='mid'>
            <IconButton
                aria-label='Next'
                icon={<ArrowRight w='24px' />}
                position='absolute'
                width={{ base: '40px', lg: '40px', xl: '48px' }}
                height={{ base: '40px', lg: '40px', xl: '48px' }}
                top='50%'
                right='-6px'
                transform='translateY(-50%)'
                bg='black'
                color='customLime.50'
                borderRadius='small'
                zIndex={1}
            />
        </Hide>
        <Flex
            overflowX='auto'
            gap={{ sm: '10px', md: '10px', lg: 3, xl: 6 }}
            w='100%'
            justify={{
                base: 'center',
                sm: 'center',
                md: 'flex-start',
                mid: 'center',
                lg: 'flex-start',
                xl: 'flex-start',
            }}
            sx={{
                '::-webkit-scrollbar': { display: 'none' },
            }}
        >
            {newRecipes.map((recipe, index) => (
                <Box
                    key={index}
                    flex='0 0 auto'
                    w={{
                        base: '160px',
                        sm: '160px',
                        md: '160px',
                        lg: '277px',
                        xl: '322px',
                    }}
                >
                    <SliderCard {...recipe} />
                </Box>
            ))}
        </Flex>
    </Box>
);

export default SliderList;
