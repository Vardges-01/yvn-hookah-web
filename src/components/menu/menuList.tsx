// import { Box, Grid } from "@mui/material";
import MenuItemCard from "./menuItems";
import { useEffect } from "react";

const MenuList = ({ menuItems, favorites, setFavorites }) => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-4 md:p-6">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          isFavorite={favorites.has(item.id)}
          onToggleFavorite={toggleFavorite}
          onAddToCart={() => console.log("ADD TO CART")}
        />
      ))}
    </div>
  );
};

export default MenuList;
