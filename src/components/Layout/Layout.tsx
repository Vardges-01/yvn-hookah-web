import { Box, Divider } from "@mui/material";
// import Header from "../header/Header";
import Navbar from "../appBars/navbar";
import { Toaster } from "react-hot-toast";
// import Footer from "../header/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Toaster position="top-right" />

        <Navbar />
        <Divider />
        <Box flexGrow={1}>{children}</Box>
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default Layout;
