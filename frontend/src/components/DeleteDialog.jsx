import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

const DeleteDialog = ({ isOpen, onClose, onConfirm, petName, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Delete Pet</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Are you sure?
              </h4>
              <p className="text-sm text-gray-600">
                This will permanently delete <span className="font-semibold">{petName}</span> from your pets list. 
                This action cannot be undone.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              {loading ? 'Deleting...' : 'Delete Pet'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;