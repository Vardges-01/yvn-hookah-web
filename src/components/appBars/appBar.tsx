import { Box, Button, IconButton, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom';


const MainAppBar = () => {

    const navigate = useNavigate();

    return (
        <Box px={1} display={['none', 'none', 'flex']} justifyContent={['center', 'center', '']} alignItems={'center'} flexGrow={1}>
            <Box flexGrow={1} >
                <IconButton onClick={() => { navigate('/') }} color='inherit' aria-label='logo' sx={{ display: 'flex', flexDirection: 'row', gap: '10px', }}>
                    <img
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
                    />
                </IconButton>
            </Box>
            <Box flexGrow={1}>
            <Stack direction='row' spacing={10}>
                <Button variant='outlined' color='inherit' onClick={() => { navigate('/') }}>Home</Button>
                <Button variant='outlined' color='inherit' onClick={() => { navigate('/menu') }}>Menu</Button>
                <Button variant='outlined' color='inherit'>About</Button>
            </Stack>
            </Box>
        </Box>
    )
}

export default MainAppBar;