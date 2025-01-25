import { Alert, Rating, Snackbar } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa";

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    rating: number;
    image?: string;
    description?: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: () => void;
}

const MenuItemCard = ({
  item,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: MenuItemProps) => {
  const { rating } = item;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ratingValue, setRatingValue] = useState(rating || 4);

  const { t } = useTranslation(); 

  return (
    item && (
      <>
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 md:p-6 flex flex-col items-center transform hover:scale-105 transition-all hover:shadow-xl hover:shadow-blue-500/20 relative">
          <button
            onClick={() => onToggleFavorite(item.id)}
            className="absolute top-4 right-4 text-xl"
          >
            <FaHeart
              className={isFavorite ? "text-red-500" : "text-gray-400"}
            />
          </button>
          {item.image ? (
            <img
              className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-2 md:mb-6 flex items-center justify-center text-3xl md:text-4xl shadow-lg"
              src={item.image}
            />
          ) : (
            <div className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-2 md:mb-6 flex items-center justify-center text-3xl md:text-4xl shadow-lg">
              🍕
            </div>
          )}

          <div className="flex md:mb-2 text-yellow-400">
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
            {t(`items.${item.name}`)}
          </h3>
          {item.description != "NULL" && (
            <p className="text-gray-400 text-sm md:text-base text-center mb-3 line-clamp-2">
              {item.description}
            </p>
          )}
          <p className="text-blue-400 font-semibold text-base md:text-lg mb-3">
            {item.price} ֏
          </p>
          <button
            onClick={onAddToCart}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all transform hover:scale-105"
          >
            +
          </button>
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
    )
  );
};

export default MenuItemCard;
