import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryTabs from "../../components/tabs/categoryTabs";
import SubCategoryTabs from "../../components/tabs/subCategoryTabs";
// import MenuList from "../../components/menu/menuList";
// import axios from "axios";
import { dbData } from "../../constants/dbData";
import SearchInput from "../../components/tabs/searchInput";
// import { API_URL } from "../../config/api"

export const Menu = () => {

    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const [categories, setCategories] = useState(null)
    const [subCategories, setSubCategories] = useState({})


    const [categoryTabValue, setCategoryTabValue] = useState(0);
    const [subCategoryTabValue, setSubCategoryValue] = useState(0);
    const [menuItems, setMenuItems] = useState([]);
    const [dataItems, setDataItems] = useState({});
    const [isClick, setIsClick] = useState(false);

    const handleChangeTabCategory = (_event, newValue) => {
        console.log(_event, newValue)
        setCategoryTabValue(newValue);
        setIsClick(true)
        setSubCategoryValue(0);
        if (Object.keys(dataItems).length) {
            console.log(categories)
            console.log(subCategories)
            console.log(subCategories[categories[newValue]])
            const subName = subCategories[newValue][subCategoryTabValue]
            const items = dataItems[subName] || []
            setMenuItems(items)
        }

    };

    const handleChangeTabSubCategory = (_event, newValue) => {
        setIsClick(false)
        setSubCategoryValue(newValue);
        if (Object.keys(dataItems).length) {
            const subName = subCategories[categories[categoryTabValue]][newValue]
            const items = dataItems[subName] || []
            setMenuItems(items)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: any = {}
                console.log(process.env.NODE_ENV)
                if (!(process.env.NODE_ENV == "development")) {
                    // response = await axios.get(API_URL + '/menu');
                    response = dbData
                }
                else {
                    response = dbData
                }
                const data = response.data

                if (data && Object.keys(data).length) {
                    console.log(data)
                    const categoryNames = Object.keys(data)

                    setCategories(categoryNames)

                    let tmpSub = {}
                    let tmpItems = {}
                    categoryNames.map((category) => {
                        tmpSub[category] = Object.keys(data[category])

                        tmpSub[category].map(subCategory => {
                            tmpItems[subCategory] = data[category][subCategory]
                            return subCategory
                        })

                        return category
                    })

                    setSubCategories(tmpSub)
                    console.log("AAAAAAAAAAAAAAAAAAAAA")
                    console.log(tmpSub)
                    console.log("AAAAAAAAAAAAAAAAAAAAA")
                    setDataItems(tmpItems)
                    const subName = tmpSub[categoryNames[0]][0]
                    const items = tmpItems[subName] || []
                    setMenuItems(items)
                }
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    return (
        (!loading && categories) && <Box>
             <Box sx={{
                    py: 1,
                    height: 'auto',
                    // backgroundColor: 'rgba(19,19,19,0.9)',
                }}>
                    <SearchInput/>
                    <CategoryTabs
                        categories={categories}
                        tabValue={categoryTabValue}
                        handleChange={handleChangeTabCategory}
                    />
                    <SubCategoryTabs
                        subCategories={subCategories[categories[categoryTabValue]]}
                        tabValue={subCategoryTabValue}
                        handleChange={handleChangeTabSubCategory}
                    />
                </Box>
        </Box>
    );

};
