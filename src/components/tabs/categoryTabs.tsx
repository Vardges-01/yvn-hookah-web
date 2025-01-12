// import { Box, Tab, Tabs } from "@mui/material";

// const CategoryTabs = ({ categories, tabValue, handleChange }) => {
//     return (
//         <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
//             <Tabs
//                 textColor="primary"
//                 value={tabValue}
//                 onChange={handleChange}
//             >
//                 {categories.length && categories.map((category, index) => (
//                     <Tab key={index} label={category}
//                         sx={{
//                             textTransform: 'none',
//                             color: 'white',
//                             fontSize: '20px',
//                             fontWeight: 'bold',
//                             mx: 0.5
//                         }} />
//                 ))}
//             </Tabs>
//         </Box>
//     )
// }

const CategoryTabs = ({ categories,tabValue, handleChange }) => {
    return (
        <div className="flex justify-center gap-8 md:gap-12 p-4 md:p-6 border-b border-gray-800">
            {categories.map((tab) => (
                <button
                    key={tab}
                    className={`text-lg md:text-xl font-semibold transition-all ${tabValue === tab
                            ? 'text-blue-500 scale-110'
                            : 'text-white/80 hover:text-white'
                        }`}
                    onClick={() => handleChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default CategoryTabs;