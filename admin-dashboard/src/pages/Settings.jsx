import { useState } from "react";
import HeaderCard from "../components/ui/HeaderCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Dark", "Light", "System"];

  return (
    <>
      <div className="p-8">
        <HeaderCard
          title1="Settings"
          title2="Preferences and integrations"
          description="Theme mode, API credentials, and dashboard preferences are managed here."
        />

        <div className="flex flex-col mt-12 gap-6">
          <button
            className="bg-gold p-3 text-xl text-on-gold text-left hover:bg-gold-deep rounded-xl transition-colors"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Edit Profile
          </button>

          <div className="relative inline-block text-left w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-gold border border-gold-dark rounded-lg p-3 text-xl text-on-gold flex
          justify-between items-center shadow-md hover:bg-gold-deep transition-colors focus:outline-none"
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
              <span
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            <div
              className={`absolute z-10 mt-1 w-full rounded-lg bg-card shadow-lg border border-card-line py-1 origin-top transform 
      transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setTheme(option.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="w-full text-right px-4 py-2 text-xl text-ink-soft hover:bg-gold-light
        hover:text-gold-deep font-bold transition-colors duration-200 block"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
