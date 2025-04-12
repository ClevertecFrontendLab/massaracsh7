import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
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
        <Box>
            <Tabs
                index={tabIndex}
                onChange={setTabIndex}
                variant='unstyled'
                align='center'
                mx={{ sm: '-16px', md: '-20px' }}
            >
                <TabList
                    overflowX='auto'
                    sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                    mb={{ sm: 6, md: 5, lg: 6, xl: 6 }}
                >
                    {veganCategories.map((category, index) => (
                        <Tab
                            key={category}
                            px={4}
                            pt={{ sm: '3px', md: '3px', lg: 4, xl: 4 }}
                            pb={2}
                            whiteSpace='nowrap'
                            fontWeight={500}
                            fontSize={{ md: '14px', lg: '16px', xl: '16px' }}
                            lineHeight={{ md: '20px', lg: '24px', xl: '24px' }}
                            color={tabIndex === index ? 'customLime.600' : 'customLime.800'}
                            borderBottom={tabIndex === index ? '2px solid' : '1px solid'}
                            borderColor={tabIndex === index ? 'customLime.600' : 'gray.200'}
                            _hover={{ color: 'customLime.600' }}
                        >
                            {category}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
        </Box>
    );
};

export default TabsCategory;
