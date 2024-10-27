import { Box, Grid } from "@mui/material";
import MenuItemCard from "./menuItems";

const MenuList = ({ menuItems }) => {
    return (
        <Box sx={{ overflowX: 'auto', width: '90%', height:'320px', p: 2 }}>
            <Grid 
                container 
                direction="row" 
                wrap="nowrap"  // Prevents wrapping to keep items in a single row
                spacing={2}
                height={'100%'}
                sx={{ justifyContent: 'flex-start' }}
            >
                {menuItems.map((item, index) => (
                    <Grid item key={index} height={'100%'}>
                        <MenuItemCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MenuList;
