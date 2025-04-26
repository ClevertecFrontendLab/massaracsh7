import '../../../node_modules/swiper/swiper.css';

import { Box, Heading, Hide, IconButton } from '@chakra-ui/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeft, ArrowRight } from '~/assets/icons/icons';
import { Recipe } from '~/types/typeRecipe';

import SliderCard from '../SliderCard/SliderCard';

interface SliderListProps {
    recipes: Recipe[];
}

const SliderList = ({ recipes }: SliderListProps) => {
    const newRecipes = recipes
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <Box
            as='section'
            position='relative'
            mb={{ sm: '30px', md: '30px', lg: '40px', xl: '44px' }}
            w='100%'
            maxW='100%'
            overflowX='hidden'
        >
            <Heading variant='sectionTitle' mb={{ sm: 3, md: 3, lg: 6, xl: 6 }}>
                Новые рецепты
            </Heading>

            <Hide below='mid'>
                <IconButton
                    aria-label='Previous'
                    className='prev'
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
                    zIndex={10}
                    data-test-id='carousel-forward'
                />
            </Hide>

            <Hide below='mid'>
                <IconButton
                    aria-label='Next'
                    className='next'
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
                    zIndex={10}
                    data-test-id='carousel-back'
                />
            </Hide>

            <Swiper
                data-test-id='carousel'
                loop={true}
                modules={[Navigation, Keyboard]}
                keyboard={{ enabled: true }}
                className='mySwiper'
                spaceBetween={16}
                slidesPerView={4}
                navigation={{
                    nextEl: '.next',
                    prevEl: '.prev',
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3.2,
                        spaceBetween: 24,
                    },
                    1440: {
                        slidesPerView: 3.5,
                        spaceBetween: 24,
                    },
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                }}
                style={{ maxWidth: '1360px', width: '100%', margin: '0 auto' }}
            >
                {newRecipes.map((recipe, index) => (
                    <SwiperSlide key={recipe.id} data-test-id={`carousel-card-${index}`}>
                        <SliderCard recipe={recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default SliderList;
