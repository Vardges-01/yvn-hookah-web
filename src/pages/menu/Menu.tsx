import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryTabs from "../../components/tabs/categoryTabs";
import SubCategoryTabs from "../../components/tabs/subCategoryTabs";
import MenuList from "../../components/menu/menuList";
import AutoScrollCarousel from "../../components/menu/autoScrollCarousel";
import { supabase } from "../../lib/supabase";
import Cart from "../../components/menu/Cart";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const Menu = () => {

  const { t } = useTranslation();

  const { isCartOpen, setIsCartOpen } = useCart();

  // const [categories, setCategories] = useState(null);
  const [categories, setCategories] = useState([]);

  const [typeTabValue, setTypeTabValue] = useState("food");
  const [subCategoryTabValue, setSubCategoryValue] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? new Set(JSON.parse(savedFavorites)) : new Set();
  });

  const { setCartItemsCount } = useCart()

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity === 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    toast.success(t('cart_clear_success'));
    setCartItems([]);
    setIsCartOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));

    if ([...favorites]?.length == 0) {
      const firstSubCategory = categories.find(
        (cat) => cat.type === typeTabValue
      );

      if (firstSubCategory) {
        setSubCategoryValue(firstSubCategory.id);
      }
    }
  }, [favorites]);

  useEffect(() => {
    setCartItemsCount(cartItems.length)
  }, [cartItems])

  const handleChangeTabCategory = (newValue) => {
    setTypeTabValue(newValue);

    const firstSubCategory = categories.find((cat) => (cat.type).toLowerCase() === newValue);
    if (firstSubCategory) {
      setSubCategoryValue(firstSubCategory.id);
    }
  };

  const handleChangeTabSubCategory = (newValue) => {
    setSubCategoryValue(newValue);
  };

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");

    const typeOrder = ["Food", "Bar", "Hookah"];

    const filteredItems = data?.sort((a, b) => {
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    });

    const sortedCategories = [...filteredItems].sort(
      (a, b) => a.position - b.position
    );

    setCategories(sortedCategories || []);

    if (
      sortedCategories &&
      sortedCategories.length > 0 &&
      !subCategoryTabValue
    ) {
      setSubCategoryValue(sortedCategories[0].id);
    }
  };

  const fetchMenuItems = async () => {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("position");

    setMenuItems(data || []);
  };

  const filteredCategories = categories.filter(
    (cat) => (cat.type).toLowerCase() === typeTabValue
  );

  const favoriteItems = menuItems.filter((item) => favorites.has(item.id));

  const filteredMenuItems =
    subCategoryTabValue == "favorite"
      ? favoriteItems
      : menuItems.filter((item) => {
        const matchesSubCategory = item.category_id === subCategoryTabValue;
        return matchesSubCategory;
      });

  return (
    <Box>
      <AutoScrollCarousel />
      <Box
        sx={{
          py: 1,
          height: "auto",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{ width: "100%" }}
        >
          <CategoryTabs
            categories={["food", "bar", "hookah"]}
            tabValue={typeTabValue}
            handleChange={handleChangeTabCategory}
          />
          <SubCategoryTabs
            subCategories={filteredCategories}
            tabValue={subCategoryTabValue}
            handleChange={handleChangeTabSubCategory}
            hasFavorites={favoriteItems.length > 0}
          />
        </Box>
        <MenuList
          menuItems={filteredMenuItems}
          favorites={favorites}
          setFavorites={setFavorites}
          // setCartItems={setCartItems}
        ></MenuList>
      </Box>
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
        onClear={handleClear}
      />
    </Box>
  );
};
