import { Box, Divider } from "@mui/material";
import Navbar from "../appBars/navbar";
import { Toaster } from "react-hot-toast";
import { useCart } from "../../context/CartContext";

const Layout = ({ children }) => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useCart();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Toaster position="top-right" />
        <Navbar
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(!isCartOpen)}
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
