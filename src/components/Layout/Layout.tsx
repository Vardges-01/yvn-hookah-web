import { Box, Divider } from "@mui/material";
import Navbar from "../appBars/navbar";
import { Toaster } from "react-hot-toast";
import { cloneElement, useState } from "react";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Toaster position="top-right" />
        <Navbar
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
        />
        <Divider />
        <Box flexGrow={1}>
          {cloneElement(children, { isCartOpen, setCartItemsCount })}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
