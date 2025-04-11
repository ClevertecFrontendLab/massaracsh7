import { Box, Button, Center, Image, Text, VStack } from '@chakra-ui/react';

const CreateRecipeButton = () => (
    <Box w='208px' bg='bg' h='208px'>
        <Center layerStyle='radialAsideBg' w='208px' h='208px'>
            <Button variant='ghost'>
                <VStack spacing={3} pt='10px'>
                    <Image src='/icons/IconPen.svg' boxSize='48px' />
                    <Text mt='2px' fontSize='sm' color='secondaryText'>
                        Записать рецепт
                    </Text>
                </VStack>
            </Button>
        </Center>
    </Box>
);

export default CreateRecipeButton;
