function DeleteConfirmationModal({title,
    message,
    onCancel,
     onDelete,
    }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[460px] rounded-2xl p-6 relative">
     <button
  onClick={onCancel}
  className="mx-auto mb-4 w-12 h-12 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 text-3xl flex items-center justify-center"
>
  &times;
    </button>
        <h2 className="text-2xl font-bold text-center">
          {title}
        </h2>
        <p className="text-gray-500 text-center mt-4">
  {message}
</p>
<div className="flex justify-center gap-4 mt-8">
  <button onClick={onCancel} className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
    Cancel
  </button>

  <button onClick={onDelete} className="px-8 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
    Delete
  </button>
</div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;