import { Tab, Tabs } from "@mui/material";

const CategoryTabs = ({ categories, tabValue, handleChange }) => {
    return (
        <Tabs
            textColor="primary"
            value={tabValue}
            onChange={handleChange}
            sx={{
                marginLeft: 3,
                display: 'flex',
                justifyContent: 'space-around',
                width: '90%'
            }}
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
    )
}

export default CategoryTabs;