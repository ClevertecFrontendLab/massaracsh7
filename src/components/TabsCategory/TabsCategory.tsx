import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

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
        <Box borderBottom='1px solid' borderColor='gray.200'>
            <Tabs index={tabIndex} onChange={setTabIndex} variant='unstyled'>
                <TabList
                    overflowX='auto'
                    borderBottom='1px solid'
                    borderColor='gray.200'
                    sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                >
                    {veganCategories.map((category, index) => (
                        <Tab
                            key={category}
                            fontWeight='medium'
                            px={4}
                            py={2}
                            whiteSpace='nowrap'
                            color={tabIndex === index ? 'customLime600' : 'gray.600'}
                            borderBottom='2px solid'
                            borderColor={tabIndex === index ? 'customLime600' : 'transparent'}
                            _hover={{ color: 'customLime600' }}
                        >
                            {category}
                        </Tab>
                    ))}
                </TabList>

                <TabPanels>
                    {veganCategories.map((category) => (
                        <TabPanel key={category} p={4}>
                            <Box>{category}</Box>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default TabsCategory;
