import { useState, useEffect, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SpecialOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const offers = [
    {
      title: "2 Large Pizzas",
      description: "Get 2 large pizzas for 4500 ֏",
      bgColor: "from-blue-800 via-blue-700 to-blue-800",
    },
    {
      title: "Happy Hours",
      description: "20% off on all drinks from 17:00 to 19:00",
      bgColor: "from-purple-800 via-purple-700 to-purple-800",
    },
    {
      title: "Student Special",
      description: "Show your student ID and get 15% off",
      bgColor: "from-red-800 via-red-700 to-red-800",
    },
    {
      title: "Family Bundle",
      description: "2 pizzas + 2 drinks + dessert for 8000 ֏",
      bgColor: "from-green-800 via-green-700 to-green-800",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative w-full h-48 md:h-64 bg-gradient-to-r ${offers[currentSlide].bgColor} mb-2 overflow-hidden transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="text-center py-16 md:py-24 transition-opacity duration-300">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
          {offers[currentSlide].title}
        </h2>
        <p className="text-lg md:text-xl text-gray-200">
          {offers[currentSlide].description}
        </p>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
