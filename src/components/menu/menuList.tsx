import { Box, Grid } from "@mui/material";
import MenuItemCard from "./menuItems";

const MenuList = ({ menuItems }) => {
    return (
        <Box sx={{width: '90%', height:'300px', p: 2 }}>
            <Grid 
                container 
                direction="row" 
                spacing={1}
                height={'100%'}
                sx={{ justifyContent: 'center' }}
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
