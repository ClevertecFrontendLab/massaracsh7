import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { SubcategoryItem } from '~/types/typeCategory';

interface TabCategoryProps {
    subcategories: SubcategoryItem[];
}

const TabsCategory = ({ subcategories }: TabCategoryProps) => {
    const navigate = useNavigate();
    const { category, subcategory } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    useEffect(() => {
        if (!subcategory || subcategories.length === 0) return;
        const index = subcategories.findIndex((cat) => cat.subcategory === subcategory);

        if (index !== -1) {
            setTabIndex(index);
        }
    }, [category, subcategory, subcategories]);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        const slug = subcategories[index].subcategory;
        navigate(`/${category}/${slug}`);
    };

    return (
        <Box>
            <Tabs
                index={tabIndex}
                onChange={handleTabChange}
                variant='unstyled'
                align='center'
                mx={{ sm: '-16px', md: '-20px' }}
            >
                <TabList
                    display='flex'
                    flexWrap={{ base: 'nowrap', mid: 'wrap' }}
                    overflowX={{ base: 'auto', mid: 'visible' }}
                    sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
                    mb={{ sm: 6, md: 5, lg: 6, xl: 6 }}
                >
                    {subcategories.map((category, index) => (
                        <Tab
                            key={category.subcategory}
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
                            data-test-id={`tab-${subcategory}-${index}`}
                        >
                            {category.title}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
        </Box>
    );
};

export default TabsCategory;
