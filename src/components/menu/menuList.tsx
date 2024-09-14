import { Box, Grid } from "@mui/material";
import MenuItemCard from "./menuItems";

const MenuList = ({ menuItems }) => {

    return (
        <Box>
            <Grid container sx={{ justifyContent: 'center' }} spacing={1.5}>
                {menuItems.map((item, index) => (
                    <Grid item key={index} sx={{ minHeight: 205 }}>
                        <MenuItemCard item={item} />
                    </Grid>
                ))}
            </Grid>

        </Box>)
};

export default MenuList