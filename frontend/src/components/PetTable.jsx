import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const PetTable = ({ pets, onEdit, onDelete, calculateAge, getPetIcon }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pet
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Weight
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Vaccination
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pets.map((pet) => (
            <tr key={pet.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{getPetIcon(pet.type)}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{pet.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pet.ownerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {calculateAge(pet.dateOfBirth)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pet.weight} kg
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {pet.lastVaccinationDate 
                  ? new Date(pet.lastVaccinationDate).toLocaleDateString()
                  : 'Not recorded'
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;