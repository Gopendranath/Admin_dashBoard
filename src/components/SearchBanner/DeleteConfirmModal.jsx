import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out scale-100 hover:scale-[1.02] border border-gray-100">
        <div className="relative">
          <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
            Confirm Deletion
          </h3>
          <button
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mb-6 text-gray-600 text-sm leading-relaxed">
          {message || 'This action cannot be undone. Are you sure you want to proceed?'}
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 ease-in-out font-medium text-sm shadow-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 ease-in-out font-medium text-sm shadow-md hover:shadow-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;