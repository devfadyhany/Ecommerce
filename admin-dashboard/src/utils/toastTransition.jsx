import { cssTransition } from "react-toastify";

export const DropFromTop = cssTransition({
  enter: "toast-drop-in",
  exit: "toast-drop-out",
});
