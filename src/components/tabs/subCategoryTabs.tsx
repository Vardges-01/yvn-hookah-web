import { useState, useEffect } from "react";
import { Box, Button, Tabs } from "@mui/material";

const SubCategoryTabs = ({ subCategories, tabValue, handleChange }) => {
    const [selectedTab, setSelectedTab] = useState(tabValue);

    useEffect(() => {
        setSelectedTab(tabValue);
    }, [tabValue]);

    const handleTabClick = (event, index) => {
        setSelectedTab(index);
        handleChange(event, index);
    };

    return (
        <Box display="flex" justifyContent="center" sx={{width:'100%'}}>
            <Tabs
                value={selectedTab}
                variant="scrollable"
                sx={{
                    ml: 3,
                    pt: 1.5,
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                }}
            >
                {subCategories.map((subCategory, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: '#2c2c2c',
                            borderRadius: '25px',
                            mx: 0.3,
                        }}
                    >
                        <Button
                            onClick={(ev) => handleTabClick(ev, index)}
                            sx={{
                                textTransform: 'none',
                                color: selectedTab === index ? '#007bff' : 'white',
                                fontFamily: 'Inter',
                                fontSize: selectedTab === index ? '20px' : '18px',
                                fontWeight: 'bold',
                                px: 2,
                                py: 0,
                            }}
                        >
                            {subCategory}
                        </Button>
                    </Box>
                ))}
            </Tabs>
        </Box>
    );
};

export default SubCategoryTabs;
