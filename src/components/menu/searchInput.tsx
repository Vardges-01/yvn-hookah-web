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
                        borderRadius: '46px',
                        color: '#2EB3CF',
                        borderColor: '#2EB3CF',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 2,
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
                        color: 'white',
                    },
                    width: '90%',
                }}
            />
        </Box>
    );
}

export default SearchInput;