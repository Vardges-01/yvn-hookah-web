import { Box, Tab, Tabs } from "@mui/material";

const CategoryTabs = ({ categories, tabValue, handleChange }) => {
    return (
        <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
            <Tabs
                textColor="primary"
                value={tabValue}
                onChange={handleChange}
            >
                {categories.length && categories.map((category, index) => (
                    <Tab key={index} label={category}
                        sx={{
                            textTransform: 'none',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            mx: 0.5
                        }} />
                ))}
            </Tabs>
        </Box>
    )
}

export default CategoryTabs;