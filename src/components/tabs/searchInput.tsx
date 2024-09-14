import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from "../../assets/icons/icon-search.svg";

function SearchInput() {
    return (
        <Box py={3} display={'flex'} justifyContent={'center'}>
            <TextField
                variant="outlined"
                placeholder="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <img src={SearchIcon} alt='' />
                        </InputAdornment>
                    ),
                    style: {
                        borderRadius: '29.5px',
                        color: '#2EB3CF',
                        borderColor: '#2EB3CF',
                    },
                    classes: {
                        notchedOutline: 'custom-notchedOutline',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#2EB3CF',
                        },
                        '&:hover fieldset': {
                            borderColor: '#2EB3CF',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2EB3CF',
                        },
                    },
                    input: {
                        color: '#fff',
                    },
                    width: '90%',
                }}
            />
        </Box>
    );
}

export default SearchInput;