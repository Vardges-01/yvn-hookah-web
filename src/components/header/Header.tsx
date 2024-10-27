import {AppBar, Box, Toolbar} from '@mui/material'
import {Icon} from '@iconify/react';
import MobileAppBar from '../appBars/mobileAppBar';
import MainAppBar from '../appBars/appBar';

const Header = () => {

    return (
        <AppBar sx={{backgroundColor: 'rgba(19,19,19,0.9)', width: '100%'}} position='fixed'>
            <Toolbar>
                <MobileAppBar/>
                <MainAppBar/>
                <Box sx={{color: '#1970C7', border: 1, p: 0.5, height: 30, borderRadius: '10px'}}
                     onClick={() => window.location.href = `tel:+37499115211`}
                >
                    <Icon height={30} width={'30px'} icon="gridicons:phone"/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
