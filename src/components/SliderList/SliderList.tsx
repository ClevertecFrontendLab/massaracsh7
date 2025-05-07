import 'swiper/swiper-bundle.css';

import { Box, Heading, IconButton } from '@chakra-ui/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeft, ArrowRight } from '~/assets/icons/icons';
import { Recipe } from '~/types/apiTypes';

import SliderCard from '../SliderCard/SliderCard';

interface SliderListProps {
    recipes: Recipe[];
}

const SliderList = ({ recipes }: SliderListProps) => {
    const newRecipes = recipes
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <Box
            as='section'
            position='relative'
            mb={{ sm: '30px', md: '30px', lg: '40px', xl: '44px' }}
            w='100%'
            maxW='1360px'
            style={{ overflow: 'visible' }}
        >
            <Heading variant='sectionTitle' mb={{ sm: 3, md: 3, lg: 6, xl: 6 }}>
                Новые рецепты
            </Heading>

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
                zIndex={14}
                data-test-id='carousel-back'
                display={{ base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}
            />

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
                zIndex={14}
                data-test-id='carousel-forward'
                display={{ base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}
            />

            <Swiper
                data-test-id='carousel'
                loop={true}
                loopAdditionalSlides={4}
                speed={0}
                modules={[Navigation, Keyboard]}
                keyboard={{ enabled: true }}
                className='mySwiper'
                spaceBetween={16}
                slidesPerView={4}
                watchSlidesProgress={true}
                navigation={{
                    nextEl: '.next',
                    prevEl: '.prev',
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    360: {
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
                style={{ width: '100%', margin: '0 auto' }}
            >
                {newRecipes.map((recipe, index) => (
                    <SwiperSlide key={recipe._id} data-test-id={`carousel-card-${index}`}>
                        <SliderCard recipe={recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default SliderList;
