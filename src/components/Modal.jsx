const Modal = ({ onClose, onConfirm, message }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-main-font">
          Confirm Action
        </h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
