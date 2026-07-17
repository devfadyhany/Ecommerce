import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import { DropFromTop } from "./utils/toastTransition";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <AppRouter />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        closeButton={false}
        theme={theme === "dark" ? "dark" : "light"}
        transition={DropFromTop}
        toastClassName="!rounded-2xl !border !border-card-line !shadow-lg !p-3 !min-h-0"
        bodyClassName="!p-0 !text-sm !font-medium"
      />
    </>
  );
}

export default App;
