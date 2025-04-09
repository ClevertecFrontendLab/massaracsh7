import { Button, Image, Text, VStack } from '@chakra-ui/react';

const CreateRecipeButton = () => (
    <Button w='208px' bg='bg' h='208px'>
        <VStack spacing={2} justify='center' layerStyle='radialAsideBg' w='208px' h='208px'>
            <Image src='/icons/IconPen.svg' boxSize='48px' />
            <Text mt='2px' fontSize='sm' color='secondaryText'>
                Записать рецепт
            </Text>
        </VStack>
    </Button>
);

export default CreateRecipeButton;
