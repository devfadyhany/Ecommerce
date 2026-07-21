import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.png";
import { useTheme } from "../../context/ThemeContext";

function AuthLayout({ title, subtitle, children }) {
  const { theme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="text-center w-full max-w-md">
        <h1 className="text-3xl flex items-center justify-center gap-1 font-bold mb-4 text-center text-ink">
          <img
            src={isDarkMode ? logoDark : logo}
            alt="Logo"
            className="w-16 mb-3"
          />
          Elite <span className="text-gold">Cart</span>
        </h1>
        <h2 className="text-2xl font-bold text-ink mt-3">{title}</h2>
        <p className="text-ink-soft mt-2">{subtitle}</p>
      </div>
      <div className="w-full max-w-md mt-4">{children}</div>
    </div>
  );
}

export default AuthLayout;
