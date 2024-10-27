import { Box, Divider } from '@mui/material'
import Header from "../header/Header";
// import Footer from "../header/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Divider />
        <Box pt={11} flexGrow={1}>{children}</Box>
        {/* <Footer /> */}
      </Box>

    </>
  );
};

export default Layout;