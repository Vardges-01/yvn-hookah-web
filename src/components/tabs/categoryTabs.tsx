import { Tab, Tabs } from "@mui/material";

const CategoryTabs = ({ categories, tabValue, handleChange }) => {
    return (
        <Tabs
            // indicatorColor='none'
            textColor="primary"
            value={tabValue}
            onChange={handleChange}
            sx={{
                px: 0.5,
            }}
            >
            {categories.length && categories.map((category, index) => (
                <Tab key={index} label={category}
                    sx={{
                        textTransform:'none',
                        color: 'white',
                        fontSize:'20px',
                        fontWeight: 'bold',
                        mx: 0.5
                    }} />
            ))}
        </Tabs>
    )
}

export default CategoryTabs;