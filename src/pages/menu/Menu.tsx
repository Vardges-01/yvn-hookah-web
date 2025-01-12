import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryTabs from "../../components/tabs/categoryTabs";
import SubCategoryTabs from "../../components/tabs/subCategoryTabs";
import MenuList from "../../components/menu/menuList";
import AutoScrollCarousel from "../../components/menu/autoScrollCarousel";
import { supabase } from "../../lib/supabase";

export const Menu = () => {
  // const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const [categoryTabValue, setCategoryTabValue] = useState('Food');
  const [subCategoryTabValue, setSubCategoryValue] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleChangeTabCategory = (newValue) => {
    setCategoryTabValue(newValue);

    const firstCategory = subCategories.find((cat) => cat.type === newValue);

    if (firstCategory) {
      setSubCategoryValue(firstCategory.id);
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
    const { data } = await supabase.from('categories').select('*');

    const typeOrder = ['Food', 'Bar', 'Hookah'];

    const filteredItems = data?.sort((a, b) => {
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    });

    const sortedCategories = [...filteredItems].sort(
      (a, b) => a.position - b.position
    );

    setSubCategories(sortedCategories || []);

    if (sortedCategories && sortedCategories.length > 0 && !subCategoryTabValue) {
      setSubCategoryValue(sortedCategories[0].id);
    }
  };

  const fetchMenuItems = async () => {
    const { data } = await supabase.from('menu_items').select('*');

    setMenuItems(data || []);
  };

  const filteredCategories = subCategories.filter((cat) => cat.type === categoryTabValue);

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSubCategory =
      item.category_id === subCategoryTabValue;
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
              categories={['Food','Bar','Hookah']}
              tabValue={categoryTabValue}
              handleChange={handleChangeTabCategory}
            />
            <SubCategoryTabs
              subCategories={filteredCategories}
              tabValue={subCategoryTabValue}
              handleChange={handleChangeTabSubCategory}
            />
          </Box>
          <MenuList menuItems={filteredMenuItems}></MenuList>
        </Box>
      </Box>
    )
};
