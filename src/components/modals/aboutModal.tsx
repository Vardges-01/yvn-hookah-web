import {
  FaTimes,
  FaInstagram,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          YVN Lounge & Bar
        </h2>

        <div className="space-y-6">
          {/* <div id="map" className="w-full h-64 rounded-lg mb-6"></div> */}
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad937e2ba658da3ede801bacae7bc222655a1a5edddad73e80cfc32b73cdeec05&amp;source=constructor"
            width="100%"
            height="256"
          ></iframe>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-300">
                51 Yeznik Koghbatsi St, Yerevan, Armenia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaClock className="text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Working Hours</h3>
              <p className="text-gray-300">Mon-Sun: 15:00 - 03:00</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-blue-400 text-xl" />
            <div>
              <h3 className="font-semibold">Contact</h3>
              <p className="text-gray-300">+374 (99) 11-52-11</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <a
              href="https://instagram.com/yvn_lounge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@yvn.lounge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
