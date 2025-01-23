import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import AboutModal from "../modals/aboutModal";
import { ShoppingCart } from "lucide-react";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartItemsCount, onCartClick }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="p-3 md:p-8 backdrop-blur-sm bg-black/30 sticky top-0 z-40">
        <div className="flex items-center justify-between mx-auto">
          {/* Logo */}
          <img
            src="https://dev.yvnhookah.am/yvn-logo.svg"
            alt="YVN Lounge"
            className="h-10 md:h-16 hover:scale-105 transition-transform"
          />

          {/* Navigation Items */}
          <div className="flex items-center gap-2 md:gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 md:px-8 py-2 text-sm md:text-lg rounded-full border-2 border-white/80 hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              ABOUT
            </button>
            <button
              onClick={onCartClick}
              className="p-2 md:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105 flex items-center justify-center relative"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <a
              href="tel:+37499115211"
              className="p-2 md:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <FaPhone className="text-lg md:text-xl" />
            </a>
          </div>
        </div>
      </nav>

      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
