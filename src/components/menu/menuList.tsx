// import { Box, Grid } from "@mui/material";
import MenuItemCard from "./menuItems";
import { useEffect, useState } from "react";

// const MenuList = ({ menuItems }) => {
//     return (
//         <Box sx={{width: '90%', height:'300px', p: 2 }}>
//             <Grid
//                 container
//                 direction="row"
//                 spacing={1}
//                 height={'100%'}
//                 sx={{ justifyContent: 'center' }}
//             >
//                 {menuItems.map((item, index) => (
//                     <Grid item key={index} height={'100%'}>
//                         <MenuItemCard item={item} />
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

const MenuList2 = ({ menuItems }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-4 md:p-6">
      {menuItems
        .map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
    </div>
  );
};

export default MenuList2;
