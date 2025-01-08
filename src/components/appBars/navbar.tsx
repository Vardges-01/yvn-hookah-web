import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import AboutModal from "../modals/aboutModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="p-4 md:p-6 flex justify-between items-center backdrop-blur-sm bg-black/30 sticky top-0 z-40">
        <img
          src="https://dev.yvnhookah.am/yvn-logo.svg"
          alt="YVN Lounge"
          className="h-12 md:h-14 hover:scale-105 transition-transform"
        />
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 rounded-full border-2 border-white/80 hover:bg-white hover:text-black transition-all transform hover:scale-105"
          >
            ABOUT
          </button>
          <a
            href="tel:+37499115211"
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <FaPhone className="text-xl" />
          </a>
        </div>
      </nav>

      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
