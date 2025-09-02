import Pet from '../models/Pet'
const express = require('express');
const router = express.Router();

let nextId = 1;

// @route   GET /api/pets
// @desc    Get all pets
// @access  Public
export const getAllPets = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: Pet.length,
      data: Pet
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @route   GET /api/pets/:id
// @desc    Get single pet by ID
// @access  Public
export const getPetById = (req, res) => {
  try {
    const pet = Pet.find(p => p.id === req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @route   POST /api/pets
// @desc    Create new pet
// @access  Public
export const createPet = (req, res) => {
  try {
    const { name, type, dateOfBirth, lastVaccinationDate, weight, ownerName } = req.body;
    
    // Validation
    if (!name || !type || !dateOfBirth || !weight || !ownerName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, type, dateOfBirth, weight, ownerName'
      });
    }
    
    // Validate weight is a positive number
    if (isNaN(weight) || parseFloat(weight) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Weight must be a positive number'
      });
    }
    
    // Validate pet type
    const validTypes = ['dog', 'cat', 'cow', 'other'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Pet type must be one of: dog, cat, cow, other'
      });
    }
    
    // Validate date format
    if (isNaN(Date.parse(dateOfBirth))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date of birth format'
      });
    }
    
    if (lastVaccinationDate && isNaN(Date.parse(lastVaccinationDate))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid last vaccination date format'
      });
    }
    
    const newPet = {
      id: nextId.toString(),
      name: name.trim(),
      type: type.toLowerCase(),
      dateOfBirth,
      lastVaccinationDate: lastVaccinationDate || null,
      weight: parseFloat(weight),
      ownerName: ownerName.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    Pet.push(newPet);
    nextId++;
    
    res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      data: newPet
    });
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @route   PUT /api/pets/:id
// @desc    Update pet
// @access  Public
export const updatePet = (req, res) => {
  try {
    const petIndex = Pet.findIndex(p => p.id === req.params.id);
    
    if (petIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    const { name, type, dateOfBirth, lastVaccinationDate, weight, ownerName } = req.body;
    
    // Validation
    if (!name || !type || !dateOfBirth || !weight || !ownerName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, type, dateOfBirth, weight, ownerName'
      });
    }
    
    // Validate weight is a positive number
    if (isNaN(weight) || parseFloat(weight) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Weight must be a positive number'
      });
    }
    
    // Validate pet type
    const validTypes = ['dog', 'cat', 'cow', 'other'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Pet type must be one of: dog, cat, cow, other'
      });
    }
    
    // Validate date format
    if (isNaN(Date.parse(dateOfBirth))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date of birth format'
      });
    }
    
    if (lastVaccinationDate && isNaN(Date.parse(lastVaccinationDate))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid last vaccination date format'
      });
    }
    
    const updatedPet = {
      ...pets[petIndex],
      name: name.trim(),
      type: type.toLowerCase(),
      dateOfBirth,
      lastVaccinationDate: lastVaccinationDate || null,
      weight: parseFloat(weight),
      ownerName: ownerName.trim(),
      updatedAt: new Date().toISOString()
    };
    
    Pet[petIndex] = updatedPet;
    
    res.status(200).json({
      success: true,
      message: 'Pet updated successfully',
      data: updatedPet
    });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @route   DELETE /api/pets/:id
// @desc    Delete pet
// @access  Public
export const deletePet = (req, res) => {
  try {
    const petIndex = Pet.findIndex(p => p.id === req.params.id);
    
    if (petIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    const deletedPet = Pet.splice(petIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Pet deleted successfully',
      data: deletedPet
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @route   GET /api/pets/search
// @desc    Search pets by name, type, or owner
// @access  Public
export const searchPets = (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const searchTerm = q.toLowerCase();
    const filteredPets = Pet.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm) ||
      pet.type.toLowerCase().includes(searchTerm) ||
      pet.ownerName.toLowerCase().includes(searchTerm)
    );
    
    res.status(200).json({
      success: true,
      count: filteredPets.length,
      data: filteredPets
    });
  } catch (error) {
    console.error('Error searching pets:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};