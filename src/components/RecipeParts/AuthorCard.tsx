import { Avatar, Box, Button, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import followIcon from '~/assets/icons/followIcon.svg';
import people from '~/assets/icons/people.svg';
import { AuthorData } from '~/types/typesAuthor';

type AuthorCardProps = {
    author: AuthorData;
};

export const AuthorCard = ({ author }: AuthorCardProps) => (
    <Box
        w={{ sm: '100%', md: '604px' }}
        p={{ sm: '3', md: '6', lg: '6', xl: '6' }}
        bg='customLime.300'
        borderRadius='xl'
        mx='auto'
    >
        <HStack spacing={{ sm: '1', md: '4', lg: '4', xl: '4' }} alignItems='stretch'>
            <Avatar src={author.imageUrl} name={author.name} w='96px' h='96px' />
            <Box w={{ sm: '150px' }} mr={{ sm: '-40px' }}>
                <Heading variant='nameTitle' mb={1} pt={{ sm: '14px' }}>
                    {author.name}
                </Heading>
                <Text mb={{ sm: '2', md: '4' }}>{author.username}</Text>
                <Button
                    bg='#000000'
                    color='white'
                    h='24px'
                    fontSize='12px'
                    lineHeight='16px'
                    px={2}
                    leftIcon={<Image src={followIcon} alt='Подписаться' boxSize='12px' />}
                >
                    Подписаться
                </Button>
            </Box>
            <VStack
                justify='space-between'
                alignItems='flex-end'
                ml={{ sm: '-20px', md: 'auto', lg: 'auto', xl: 'auto' }}
            >
                <Text>Автор рецепта</Text>
                <HStack py={1} px={1.5}>
                    <Image src={people} alt='numbers' boxSize='12px' />
                    <Text textStyle='limeSmall'>{author.numbers}</Text>
                </HStack>
            </VStack>
        </HStack>
    </Box>
);
