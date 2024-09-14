import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {

    const navigate = useNavigate();

    return (
        <Box bgcolor="#3335" color="white" py={2} mt={2}>
            <Container>
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid item xs={12} sm={6} >
                        <Typography variant="h6" gutterBottom>
                            YVN Lounge & Hookah bar
                        </Typography>
                        <Typography variant="body2">
                            A hookah bar, is a social venue where people gather to enjoy smoking flavored tobacco through water pipes.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            Koghbatsi 51, Yerevan, Armenia
                        </Typography>
                        <Typography variant="body2">
                            Phone: +(374)99-11-52-11
                        </Typography>
                        <Typography variant="body2">
                            W/H: 16:00 - 03:00
                        </Typography>
                    </Grid>
                </Grid>
                <Divider color='white' sx={{ my: 2 }} />
                <Box display={'flex'} justifyContent={'space-between'}>
                    <IconButton onClick={() => { navigate('/') }} color='inherit' aria-label='logo' sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} >
                        <img
                            src="/yvn-hookah-logo.png"
                            alt=""
                            width='28'
                            height='28'
                        />
                        <img
                            src="/yvn-name.png"
                            alt=""
                            width='56'
                            height='24'
                        />
                    </IconButton>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton href='https://www.instagram.com/yvn_lounge'>
                            <Icon aria-label='InstagramIcon' icon={'skill-icons:instagram'} />
                        </IconButton>
                        <IconButton href='https://www.tiktok.com/@yvn.lounge'>
                            <Icon aria-label='TikTokIcon' icon={'logos:tiktok-icon'} />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer;
