// import { Box, Grid } from "@mui/material";
import { toast } from "react-hot-toast";
import MenuItemCard from "./menuItems";
import { useTranslation } from "react-i18next";

const MenuList = ({ menuItems, favorites, setFavorites, setCartItems }) => {
  const { t } = useTranslation();

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

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ];
    });
    toast.success(t(`items.${item.name}`) + ' ' + t('added_to_cart'));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-4 md:p-6">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          isFavorite={favorites.has(item.id)}
          onToggleFavorite={toggleFavorite}
          onAddToCart={() => addToCart(item)}
        />
      ))}
    </div>
  );
};

export default MenuList;
