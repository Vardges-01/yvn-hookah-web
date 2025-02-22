import { Box, Divider } from "@mui/material";
import { Toaster } from "react-hot-toast";
// import { useCart } from "../../context/CartContext";
import Header from "../header/Header";

const Layout = ({ children }) => {
  // const { isCartOpen, setIsCartOpen, cartItemsCount } = useCart();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Toaster position="top-right" />
        <Header
          // cartItemsCount={cartItemsCount}
          // onCartClick={() => setIsCartOpen(!isCartOpen)}
        />
        <Divider />
        <Box flexGrow={1}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
