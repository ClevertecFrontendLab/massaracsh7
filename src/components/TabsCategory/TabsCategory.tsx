import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

// import { veganRecipes } from '~/data/cardsData';

// import RecipeList from '../RecipeList/RecipeList';

const veganCategories = [
    'Закуски',
    'Первые блюда',
    'Вторые блюда',
    'Гарниры',
    'Десерты',
    'Выпечка',
    'Сыроедческие блюда',
    'Напитки',
];

const TabsCategory = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box>
            <Tabs index={tabIndex} onChange={setTabIndex} variant='unstyled' align='center'>
                <TabList
                    overflowX='auto'
                    sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                    mb={6}
                >
                    {veganCategories.map((category, index) => (
                        <Tab
                            key={category}
                            px={4}
                            pt={4}
                            pb={2}
                            whiteSpace='nowrap'
                            fontWeight={500}
                            fontSize='16px'
                            lineHeight='24px'
                            color={tabIndex === index ? 'customLime.600' : 'customLime.800'}
                            borderBottom={tabIndex === index ? '2px solid' : '1px solid'}
                            borderColor={tabIndex === index ? 'customLime.600' : 'gray.200'}
                            _hover={{ color: 'customLime.600' }}
                        >
                            {category}
                        </Tab>
                    ))}
                </TabList>

                {/* <TabPanels p='0'>
                    {veganCategories.map((category) => (
                        <TabPanel key={category} p={4}>
                            <RecipeList recipes={veganRecipes} space={[6, 4]} />
                        </TabPanel>
                    ))}
                </TabPanels> */}
            </Tabs>
        </Box>
    );
};

export default TabsCategory;
