import { TrashIcon } from "lucide-react";

function DeleteConfirmationModal({ title, message, onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card w-[460px] rounded-2xl p-6 relative">
        <div className="mx-auto mb-4 size-16 rounded-full bg-surface-fields text-ink text-3xl flex items-center justify-center">
          <TrashIcon className="size-8" />
        </div>
        <h2 className="text-2xl font-bold text-center text-ink">{title}</h2>
        <p className="text-ink-soft text-center mt-4">{message}</p>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-8 py-2 border border-card-line rounded-lg text-ink-soft hover:bg-surface-fields"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
