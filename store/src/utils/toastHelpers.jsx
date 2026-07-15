import { toast } from "react-toastify";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

function ToastContent({ icon: Icon, iconColor, message }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
      <span className="text-ink text-sm">{message}</span>
    </div>
  );
}

export const showSuccessToast = (message) =>
  toast(
    <ToastContent
      icon={CheckCircle2}
      iconColor="text-emerald-500"
      message={message}
    />,
    {
      icon: false,
    },
  );

export const showErrorToast = (message) =>
  toast(
    <ToastContent icon={XCircle} iconColor="text-rose-500" message={message} />,
    {
      icon: false,
    },
  );

export const showWarningToast = (message) =>
  toast(
    <ToastContent
      icon={AlertTriangle}
      iconColor="text-amber-500"
      message={message}
    />,
    {
      icon: false,
    },
  );

export const showInfoToast = (message) =>
  toast(<ToastContent icon={Info} iconColor="text-gold" message={message} />, {
    icon: false,
  });
