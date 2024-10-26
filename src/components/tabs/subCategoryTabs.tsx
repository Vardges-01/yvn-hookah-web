import { useState, useEffect } from "react";
import { Box, Button, Tabs } from "@mui/material";

const SubCategoryTabs = ({ subCategories, tabValue, handleChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    // Set the default tab as the first element
    useEffect(() => {
        setSelectedTab(tabValue);
    }, [tabValue]);

    const handleTabClick = (event, index) => {
        setSelectedTab(index);
        handleChange(event, index);
    };

    return (
        <Box display="flex" justifyContent="start">
            <Tabs
                value={selectedTab}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                    pt: 1,
                    '& .MuiTabs-indicator': {
                        display: 'none', // Hide the indicator
                    },
                }}
            >
                {subCategories.map((subCategory, index) => (
                    <Button
                        key={index}
                        onClick={(ev) => handleTabClick(ev, index)}
                        sx={{
                            ':focus': {
                                backgroundColor: '#2c2c2c',
                                color: '#007bff',
                                fontSize: '18px',
                            },
                            textTransform: 'none',
                            color: selectedTab === index ? '#007bff' : 'white',
                            fontFamily: 'Inter',
                            fontSize: selectedTab === index ? '18px' : '16px',
                            fontWeight: 'bold',
                            m: 0.5,
                            borderRadius: '25px',
                            backgroundColor: '#2c2c2c',
                            padding: 0,
                            px: 0.8,
                        }}
                    >
                        {subCategory}
                    </Button>
                ))}
            </Tabs>
        </Box>
    );
};

export default SubCategoryTabs;
