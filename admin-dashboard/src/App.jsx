import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import { DropFromTop } from "./utils/toastTransition";

function App() {
  return (
    <>
      <AppRouter />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={DropFromTop}
        toastClassName="!rounded-2xl !border !border-card-line !shadow-lg !p-3 !min-h-0"
        bodyClassName="!p-0 !text-sm !font-medium"
      />
    </>
  );
}

export default App;
