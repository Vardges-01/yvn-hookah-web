import { Alert, Rating, Snackbar } from "@mui/material";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

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

// const MenuItemCard2 = ({ item }) => {
//   const { name, imageUrl, price, rating } = item;

//   const [showDescrip, setShowDescrip] = useState(false);
//   const [ratingValue, setRatingValue] = useState(rating || 4);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const handleClick = () => {
//     setShowDescrip(!showDescrip);
//   };

//   useEffect(() => {
//     setShowDescrip(false);
//     setRatingValue(rating || 4);
//   }, [name, rating]);

//   return (
//     <Box
//       sx={{
//         background: "none",
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           top: "20%",
//           backgroundColor: "rgba(49, 54, 56, 0.9)",
//           color: "white",
//           borderRadius: "10px 10px 10px 10px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "end",
//           alignItems: "center",
//           textAlign: "center",
//           width: "170px",
//           height: "200px",
//           pb: 1,
//         }}
//       >
//         <Rating
//           sx={{ color: "#1976D2", py: 1, pt: 1 }}
//           name="simple-controlled"
//           value={ratingValue}
//           onChange={(_event, newValue) => {
//             setRatingValue(newValue);
//             setOpenSnackbar(true);
//           }}
//           size="large"
//         />
//         <Typography
//           fontWeight={"bold"}
//           fontSize={"22px"}
//           width={"100%"}
//           sx={{
//             whiteSpace: "nowrap",
//             overflow: "auto",
//           }}
//         >
//           {name}
//         </Typography>
//         <Typography fontWeight={"bold"} fontSize={"20px"} color={"#2EB3CF"}>
//           {price + "֏"}
//         </Typography>
//       </Box>
//       <Box
//         position={"absolute"}
//         bgcolor={"white"}
//         borderRadius={"50%"}
//         top={"0%"}
//       >
//         <img
//           onClick={handleClick}
//           style={{
//             background: "none",
//             border: 1,
//             margin: 10,
//           }}
//           height={120}
//           width={120}
//           src={
//             imageUrl
//               ? "https://dev.yvnhookah.am" + imageUrl
//               : "https://dev.yvnhookah.am/default.jpg"
//           }
//           alt={name}
//         />
//       </Box>
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={4000}
//         onClose={() => {
//           setOpenSnackbar(false);
//         }}
//       >
//         <Alert severity="success">{`Thanks for Rate :)`}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

const MenuItemCard3 = ({ item, isFavorite, onToggleFavorite }) => {
  const { name, imageUrl, price, rating } = item;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ratingValue, setRatingValue] = useState(rating || 4);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center transform hover:scale-105 transition-all hover:shadow-xl hover:shadow-blue-500/20 relative">
        <button
          onClick={() => onToggleFavorite(item.id)}
          className="absolute top-4 right-4 text-xl"
        >
          <FaHeart className={isFavorite ? "text-red-500" : "text-gray-400"} />
        </button>

        <div className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-4 md:mb-6 flex items-center justify-center text-3xl md:text-4xl shadow-lg">
          <img
            src={
              imageUrl
                ? "https://dev.yvnhookah.am" + imageUrl
                : "https://dev.yvnhookah.am/default.jpg"
            }
          />
        </div>

        <div className="flex mb-2 md:mb-3 text-yellow-400">
          <Rating
            sx={{ color: "#ffca28", py: 1, pt: 1 }}
            name="rate"
            value={ratingValue}
            onChange={(_event, newValue) => {
              setRatingValue(newValue);
              setOpenSnackbar(true);
            }}
            size="medium"
          />
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-center">
          {name}
        </h3>
        <p className="text-blue-400 font-semibold text-base md:text-lg">
          {price + " ֏"}
        </p>
      </div>
      <Snackbar
        open={openSnackbar}
        sx={{
          width: "95%",
          justifyContent: "right",
        }}
        autoHideDuration={4000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert severity="success">{`Thanks for Rate :)`}</Alert>
      </Snackbar>
    </>
  );
};

export default MenuItemCard3;
