import { Box, CircularProgress } from "@mui/material"

export const Home = () => {

    return (
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress sx={{ width: '100%', height: '100%' }} />
        </Box>
    )
}