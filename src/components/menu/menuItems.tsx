import { Alert, Box, Rating, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// const MenuItemCard = ({ item }) => {

//     const { name, imageUrl, price, description, rating } = item;

//     const [showDescrip, setShowDescrip] = useState(false);
//     const [ratingValue, setRatingValue] = useState(rating || 4);
//     const [openSnackbar, setOpenSnackbar] = useState(false);

//     const handleClick = () => {
//         setShowDescrip(!showDescrip)
//     }

//     useEffect(() => {
//         setShowDescrip(false)
//         setRatingValue(rating || 4)
//     }, [name, rating]);

//     return (
//         <Box
//             sx={{
//                 background: 'none',
//                 position: 'relative',
//                 width: '120px',
//                 height: '170px',
//                 maxWidth: '120px',
//                 maxHeigth: '170px'
//             }}>
//             <img
//                 onClick={handleClick}
//                 style={{
//                     background: 'none',
//                     border: 1,
//                     filter: 'drop-shadow(0px 5px 10px rgba(0, 167, 189))'
//                 }}
//                 height={100}
//                 width={120}
//                 src={imageUrl ? 'https://dev.yvnhookah.am' + imageUrl : 'https://dev.yvnhookah.am/default.jpg'}
//                 alt={name}
//             />
//             <Box sx={{
//                 position: 'absolute',
//                 top: '45%',
//                 backgroundColor: 'rgba(49, 54, 56, 0.9)',
//                 color: 'white',
//                 borderRadius: '10px 10px 10px 10px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 width: '100%',
//                 pb: 1
//             }}>
//                 <Rating
//                     sx={{ color: '#1976D2', py: 1, pt: 1 }}
//                     name="simple-controlled"
//                     value={ratingValue}
//                     onChange={(_event, newValue) => {

//                         setRatingValue(newValue);
//                         setOpenSnackbar(true)
//                     }}
//                     size="small"
//                 />
//                 <Typography fontWeight={'bold'} variant="body1" width={'100%'} sx={{
//                     whiteSpace: 'nowrap',
//                     overflow: 'scroll',
//                 }}>{name}</Typography>
//                 <Typography fontWeight={'bold'} variant="body1">{price + ' ֏'}</Typography>
//             </Box>
//             <Grow in={showDescrip} timeout={500}>
//                 <Box
//                     onClick={handleClick}
//                     sx={{
//                         position: 'absolute',
//                         backgroundColor: 'rgb(0,0,0,0.9)',
//                         width: '100%',
//                         height: '100%',
//                         minHeight: 205,
//                         top: '3%',
//                         color: 'white',
//                     }}>
//                     {description?.split('-').map((el, index) => (
//                         <Typography variant="body2" key={index}>
//                             {'- ' + el}
//                         </Typography>
//                     ))}
//                 </Box>
//             </Grow>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={4000}
//                 onClose={() => {
//                     setOpenSnackbar(false)
//                 }}
//             >
//                 <Alert severity="success">
//                     {`Thanks for Rate :)`}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     )
// }

const MenuNewItemCard = ({ item }) => {
    const { name, imageUrl, price, rating } = item;

    const [showDescrip, setShowDescrip] = useState(false);
    const [ratingValue, setRatingValue] = useState(rating || 4);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClick = () => {
        setShowDescrip(!showDescrip)
    }

    useEffect(() => {
        setShowDescrip(false)
        setRatingValue(rating || 4)
    }, [name, rating]);

    return (
        <Box
            sx={{
                background: 'none',
                position: 'relative',
                width: '100%',
                height: '170px',
                display: 'flex',
                justifyContent: 'center'
            }}>
            <Box sx={{
                position: 'relative',
                top: '20%',
                backgroundColor: 'rgba(49, 54, 56, 0.9)',
                color: 'white',
                borderRadius: '10px 10px 10px 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'end',
                alignItems: 'center',
                textAlign: 'center',
                width: '217px',
                height: '250px',
                pb: 1
            }}>
                <Rating
                    sx={{ color: '#1976D2', py: 1, pt: 1 }}
                    name="simple-controlled"
                    value={ratingValue}
                    onChange={(_event, newValue) => {

                        setRatingValue(newValue);
                        setOpenSnackbar(true)
                    }}
                    size="large"
                />
                <Typography fontWeight={'bold'} fontSize={'22px'} width={'100%'} sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'scroll',
                }}>{name}</Typography>
                <Typography fontWeight={'bold'} fontSize={"20px"} color={'#2EB3CF'}>{price + '֏'}</Typography>
            </Box>
            <Box position={'absolute'} bgcolor={'white'} borderRadius={'50%'} top={'0%'}>
                <img
                    onClick={handleClick}
                    style={{
                        background: 'none',
                        border: 1,
                        margin: 10
                    }}
                    height={140}
                    width={140}
                    src={imageUrl ? 'https://dev.yvnhookah.am' + imageUrl : 'https://dev.yvnhookah.am/default.jpg'}
                    alt={name}
                />
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => {
                    setOpenSnackbar(false)
                }}
            >
                <Alert severity="success">
                    {`Thanks for Rate :)`}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default MenuNewItemCard