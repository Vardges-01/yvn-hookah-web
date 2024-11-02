import { useState } from 'react';
import {
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Button,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { LunchDining } from '@mui/icons-material';
import menuIcon from "../../assets/icons/icon-menu.svg";


const MobileAppBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const list = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ backgroundColor: 'rgb(19,19,19)' }}
            height={'100%'}
        >
            <List sx={{ color: 'white' }}>
                <ListItem onClick={() => { navigate('/') }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <HomeIcon />
                    </ListItemIcon>
                    <Button color='inherit'>Home</Button>
                </ListItem>
                <ListItem onClick={() => { navigate('/menu') }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <LunchDining />
                    </ListItemIcon>
                    <Button color='inherit'>Menu</Button>
                </ListItem>
                <ListItem onClick={() => { navigate('/menu') }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                        <InfoIcon />
                    </ListItemIcon>
                    <Button color='inherit' >About</Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box flexGrow={1}  display={['flex', 'flex', 'none']} alignItems={'center'}>
            <Box flexGrow={1}>
                <Box>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        {/* <MenuIcon /> */}
                        <img src={menuIcon} alt="" />
                    </IconButton>
                </Box>
                <Drawer
                    PaperProps={{
                        sx: {
                            opacity: 0.9,
                        },
                    }}
                    anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list}
                </Drawer>
            </Box>
            <Box flexGrow={1} >
                <IconButton onClick={() => { navigate('/') }} color='inherit' aria-label='logo' sx={{ display: 'flex', flexDirection: 'row', gap: '10px', }}>
                    {/* <img
                        src="/yvn-hookah-logo.png"
                        alt=""
                        width='56'
                        height='56'
                    />
                    <img
                        src="/yvn-name.png"
                        alt=""
                        width='112'
                        height='48'
                    /> */}
                     <img
                        src="/yvn-logo.png"
                        alt=""
                        width='135'
                        height='60'
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MobileAppBar;
