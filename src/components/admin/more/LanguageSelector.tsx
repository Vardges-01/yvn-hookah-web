import { useState } from "react";
import i18n from "../../../locales/i18n";

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: "en", flag: <img src="/en.png" alt="en" /> }, // En flag emoji
        { code: "ru", flag: <img src="/ru.png" alt="ru" /> }, // Russia flag emoji
    ];

    const handleLanguageChange = (code) => {
        setSelectedLanguage(code);
        i18n.changeLanguage(code);
        localStorage.setItem('language', code);

        setIsOpen(false); // Close the menu after selection
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                {/* Selected Language Button */}
                <button
                    className="w-[34px] h-[34px] md:w-[52px] md:h-[52px] flex items-center justify-center rounded-full text-xl border-2 border-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {languages.find((lang) => lang.code === selectedLanguage)?.flag}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute mt-2 flex flex-col items-center space-y-2 rounded-lg shadow-md">
                        {languages
                            .filter((lang) => lang.code !== selectedLanguage)
                            .map((lang) => (
                                <button
                                    key={lang.code}
                                    className="w-[34px] h-[34px] md:w-[52px] md:h-[52px] flex items-center justify-center rounded-full text-xl border-2 border-gray-300 hover:border-blue-500"
                                    onClick={() => handleLanguageChange(lang.code)}
                                >
                                    {lang.flag}
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageSelector;
