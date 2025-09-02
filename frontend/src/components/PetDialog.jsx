import React from 'react';
import { X, PawPrint } from 'lucide-react';

const PetDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  petData, 
  onInputChange, 
  loading, 
  title, 
  submitText 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Name *
            </label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={onInputChange}
              placeholder="Enter pet's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type *
            </label>
            <select
              name="type"
              value={petData.type}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select pet type</option>
              <option value="dog">Dog 🐕</option>
              <option value="cat">Cat 🐱</option>
              <option value="cow">Cow 🐄</option>
              <option value="other">Other 🐾</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={petData.dateOfBirth}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Vaccination Date
            </label>
            <input
              type="date"
              name="lastVaccinationDate"
              value={petData.lastVaccinationDate}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg) *
            </label>
            <input
              type="number"
              name="weight"
              value={petData.weight}
              onChange={onInputChange}
              placeholder="Enter weight in kg"
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Name *
            </label>
            <input
              type="text"
              name="ownerName"
              value={petData.ownerName}
              onChange={onInputChange}
              placeholder="Enter owner's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              <PawPrint className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetDialog;