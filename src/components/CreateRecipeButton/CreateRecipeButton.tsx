import { Button, Center, Image, Text, VStack } from '@chakra-ui/react';

const CreateRecipeButton = () => (
    <Center w='208px' h='208px'>
        <Button variant='radial' w='208px' h='208px'>
            <VStack spacing={3} pt='10px'>
                <Image src='/icons/IconPen.svg' boxSize='48px' />
                <Text mt='2px' fontSize='sm' color='secondaryText'>
                    Записать рецепт
                </Text>
            </VStack>
        </Button>
    </Center>
);

export default CreateRecipeButton;
