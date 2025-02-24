import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";

export default function SpecialOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const { t } = useTranslation();

  const fetchPromos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("promos").select("*");

      if (error) {
        console.error("Error fetching promos:", error);
        // Handle error, maybe show a message to the user
      }

      setPromos(data || []);
    } finally {
      setLoading(false);
    }
  };

  // const promos = [
  //   {
  //     name: "Hookah Boom",
  //     description: 'hookah_boom',
  //   },
  //   {
  //     name: "Happy Hours",
  //     description: 'happy_hours',
  //   },
  //   {
  //     name: "Birthday Special",
  //     description: 'birthday_special',
  //   },
  // ];

  const nextSlide = () => {
    if (promos.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }
  };

  const prevSlide = () => {
    if (promos.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
    }
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
    fetchPromos();
  }, []);

  useEffect(() => {
    if (promos.length === 0) return; // Ждём, пока promos загрузится

    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [promos]);

  // Loading
  if (loading) {
    return <div className="text-center py-4">Loading...</div>; // Simple loading message
  }

  if (!promos.length) {
    return <div className="text-center py-4">New Promos Comming Soon.</div>; // Message if no promos
  }

  return (
    <div
      className={`relative w-full h-48 md:h-64 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 mb-2 overflow-hidden transition-all duration-500`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="text-center py-10 md:py-20 transition-opacity duration-300">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse">
          {promos[currentSlide]?.name}
        </h2>
        <p className="text-lg md:text-xl text-gray-200">
          {t(`promo.${promos[currentSlide]?.description}`)} {/* Optional chaining */}
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}