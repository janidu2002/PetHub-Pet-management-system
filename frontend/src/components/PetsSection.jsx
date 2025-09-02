import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Edit, 
  Trash2, 
  X, 
  Calendar, 
  Weight, 
  User, 
  PawPrint,
  Heart,
  Syringe,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import PetDialog from './PetDialog';
import DeleteDialog from './DeleteDialog';
import PetTable from './PetTable';
import PetCard from './PetCard';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL

const PetsSection = () => {
  const [pets, setPets] = useState([]);
  const [viewMode, setViewMode] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  
  const [petData, setPetData] = useState({
    name: '',
    type: '',
    dateOfBirth: '',
    lastVaccinationDate: '',
    weight: '',
    ownerName: ''
  });

  // Load from localStorage on component mount
  useEffect(() => {
    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, []);

  // Save to localStorage whenever pets array changes
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  // API Functions with fallback to localStorage
  const fetchPets = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/pets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPets(data.data || []);
        setIsOnline(true);
        setUseLocalStorage(false);
      } else {
        throw new Error(data.message || 'Failed to fetch pets');
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
      setIsOnline(false);
      setUseLocalStorage(true);
      setError('Using offline mode - server unavailable');
      
      // Load from localStorage as fallback
      const savedPets = localStorage.getItem('pets');
      if (savedPets) {
        setPets(JSON.parse(savedPets));
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const createPet = async (petData) => {
    if (useLocalStorage) {
      // Offline mode - use localStorage
      const newPet = {
        id: Date.now().toString(),
        ...petData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return { success: true, data: newPet };
    }

    const response = await fetch(`${API_BASE_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create pet');
    }
    
    return data;
  };

  const updatePetAPI = async (id, petData) => {
    if (useLocalStorage) {
      // Offline mode - return updated data
      return { 
        success: true, 
        data: { 
          id, 
          ...petData, 
          updatedAt: new Date().toISOString() 
        } 
      };
    }

    const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update pet');
    }
    
    return data;
  };

  const deletePetAPI = async (id) => {
    if (useLocalStorage) {
      // Offline mode - just return success
      return { success: true };
    }

    const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete pet');
    }
    
    return data;
  };

  // Load pets on component mount
  useEffect(() => {
    fetchPets();
  }, []);

  const resetForm = () => {
    setPetData({
      name: '',
      type: '',
      dateOfBirth: '',
      lastVaccinationDate: '',
      weight: '',
      ownerName: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await createPet(petData);
      setPets(prev => [...prev, result.data]);
      setShowAddDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error adding pet:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await updatePetAPI(selectedPet.id, petData);
      setPets(prev => prev.map(pet => 
        pet.id === selectedPet.id ? result.data : pet
      ));
      setShowUpdateDialog(false);
      setSelectedPet(null);
      resetForm();
    } catch (error) {
      console.error('Error updating pet:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await deletePetAPI(selectedPet.id);
      setPets(prev => prev.filter(pet => pet.id !== selectedPet.id));
      setShowDeleteDialog(false);
      setSelectedPet(null);
    } catch (error) {
      console.error('Error deleting pet:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateDialog = (pet) => {
    setSelectedPet(pet);
    setPetData({
      name: pet.name,
      type: pet.type,
      dateOfBirth: pet.dateOfBirth,
      lastVaccinationDate: pet.lastVaccinationDate || '',
      weight: pet.weight.toString(),
      ownerName: pet.ownerName
    });
    setShowUpdateDialog(true);
  };

  const openDeleteDialog = (pet) => {
    setSelectedPet(pet);
    setShowDeleteDialog(true);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth) => {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} old`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} old`;
    } else {
      return 'Less than a month old';
    }
  };

  const getPetIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'dog':
        return '🐕';
      case 'cat':
        return '🐱';
      case 'cow':
        return '🐄';
      default:
        return '🐾';
    }
  };

  // Connection status indicator
  const ConnectionStatus = () => (
    <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
      isOnline 
        ? 'bg-green-100 text-green-800' 
        : 'bg-orange-100 text-orange-800'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4 mr-1" />
          Online
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 mr-1" />
          Offline Mode
        </>
      )}
    </div>
  );

  // Error display component
  const ErrorDisplay = ({ message, onRetry }) => (
    <div className={`border rounded-lg p-4 mb-6 ${
      useLocalStorage 
        ? 'bg-orange-50 border-orange-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-start">
        <AlertCircle className={`w-5 h-5 mt-0.5 mr-3 ${
          useLocalStorage ? 'text-orange-500' : 'text-red-500'
        }`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${
            useLocalStorage ? 'text-orange-900' : 'text-red-900'
          }`}>
            {useLocalStorage ? 'Offline Mode' : 'Error'}
          </p>
          <p className={`text-sm mt-1 ${
            useLocalStorage ? 'text-orange-700' : 'text-red-700'
          }`}>
            {message}
          </p>
          {onRetry && !useLocalStorage && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (fetchLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading pets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      {error && (
        <ErrorDisplay 
          message={error} 
          onRetry={() => {
            setError(null);
            fetchPets();
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">My Pets</h2>
          <ConnectionStatus />
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Pet
        </button>
      </div>

      {/* Search and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'cards' 
              ? 'bg-white text-blue-500 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'table' 
              ? 'bg-white text-blue-500 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredPets.length === 0 && searchTerm === '' && pets.length === 0 && (
        <div className="text-center py-12">
          <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pets yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first pet to keep track of their information.</p>
          <button
            onClick={() => setShowAddDialog(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Pet
          </button>
        </div>
      )}

      {/* No Search Results */}
      {filteredPets.length === 0 && searchTerm !== '' && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pets found</h3>
          <p className="text-gray-500">Try adjusting your search terms.</p>
        </div>
      )}

      {/* Cards View */}
      {viewMode === 'cards' && filteredPets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onEdit={openUpdateDialog}
              onDelete={openDeleteDialog}
              calculateAge={calculateAge}
              getPetIcon={getPetIcon}
            />
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredPets.length > 0 && (
        <PetTable
          pets={filteredPets}
          onEdit={openUpdateDialog}
          onDelete={openDeleteDialog}
          calculateAge={calculateAge}
          getPetIcon={getPetIcon}
        />
      )}

      {/* Add Pet Dialog */}
      <PetDialog
        isOpen={showAddDialog}
        onClose={() => {
          setShowAddDialog(false);
          resetForm();
          setError(null);
        }}
        onSubmit={handleAddPet}
        petData={petData}
        onInputChange={handleInputChange}
        loading={loading}
        title="Add New Pet"
        submitText="Add Pet"
        error={error}
      />

      {/* Update Pet Dialog */}
      <PetDialog
        isOpen={showUpdateDialog}
        onClose={() => {
          setShowUpdateDialog(false);
          setSelectedPet(null);
          resetForm();
          setError(null);
        }}
        onSubmit={handleUpdatePet}
        petData={petData}
        onInputChange={handleInputChange}
        loading={loading}
        title="Update Pet"
        submitText="Update Pet"
        error={error}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedPet(null);
          setError(null);
        }}
        onConfirm={handleDeletePet}
        petName={selectedPet?.name}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PetsSection;