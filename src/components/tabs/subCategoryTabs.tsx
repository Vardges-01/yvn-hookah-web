import { Box, Tab, Tabs } from "@mui/material"

const SubCategoryTabs = ({ subCategories, tabValue, handleChange }) => {


    return (
        <Box display={'flex'} justifyContent={'start'}>
            <Tabs
                indicatorColor='none'
                value={tabValue}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{
                    pt: 1,
                    '& .MuiTabScrollButton-root': {
                        backgroundColor: 'rgba(44, 171, 198, 0.3)', width: '30px', color: 'white', m: 0.1, border: 1, borderRadius: '30px'
                    },
                    '& .MuiTab-root:hover': {
                        color: '#007bff',
                        opacity: 1,
                    }
                }}
            >
                {subCategories.map((subCategory, index) => (
                    <Tab sx={{
                       textTransform:'none',p:0,m:0, width:'51px', height:'auto', color: 'white', fontSize: '14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 100}} key={index} label={subCategory} />
                ))}
            </Tabs>
        </Box>
    )
}

export default SubCategoryTabs