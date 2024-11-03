import { useEffect, useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const images = [
    'https://via.placeholder.com/600x200?text=AKCIA+1',
    'https://via.placeholder.com/600x200?text=AKCIA+2',
    'https://via.placeholder.com/600x200?text=AKCIA+3',
    'https://via.placeholder.com/600x200?text=AKCIA+4',
];

const AutoScrollCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
    };

    useEffect(() => {
        startInterval(); // Start the interval when the component mounts

        return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
    }, []);

    const resetInterval = () => {
        clearInterval(intervalRef.current); // Clear the existing interval
        startInterval(); // Start a new interval
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        resetInterval(); // Reset the interval on manual navigation
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        resetInterval(); // Reset the interval on manual navigation
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Box sx={{ width: '100%', display: 'flex', transition: 'transform 2s ease', transform: `translate3d(-${currentIndex * 100}%, 0px, 0px)` }}>
                {images.map((image, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={image}
                        alt={`Slide ${index + 1}`}
                        sx={{ width: '90%', mx: '5%', borderRadius: 5 }}
                    />
                ))}
            </Box>
            
            <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 15, color:'#007bff' }}>
                <NavigateBeforeIcon />
            </IconButton>

            <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 15, color:'#007bff'}}>
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
};

export default AutoScrollCarousel;
