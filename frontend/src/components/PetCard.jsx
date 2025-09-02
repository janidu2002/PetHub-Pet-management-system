import React from 'react';
import { Edit, Trash2, Calendar, Weight, User, Syringe, Heart } from 'lucide-react';

const PetCard = ({ pet, onEdit, onDelete, calculateAge, getPetIcon }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{getPetIcon(pet.type)}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{pet.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(pet)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(pet)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">Owner:</span>
          <span className="ml-1">{pet.ownerName}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Heart className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">Age:</span>
          <span className="ml-1">{calculateAge(pet.dateOfBirth)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Weight className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">Weight:</span>
          <span className="ml-1">{pet.weight} kg</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">Born:</span>
          <span className="ml-1">{new Date(pet.dateOfBirth).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Syringe className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">Last Vaccination:</span>
          <span className="ml-1">
            {pet.lastVaccinationDate 
              ? new Date(pet.lastVaccinationDate).toLocaleDateString()
              : 'Not recorded'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;