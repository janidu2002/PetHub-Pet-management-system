import Pet from '../models/Pet.js';

// @desc    Get all pets
// @route   GET /api/pets
// @access  Public
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get single pet by ID
// @route   GET /api/pets/:id
// @access  Public
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    res.json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Create new pet
// @route   POST /api/pets
// @access  Public
export const createPet = async (req, res) => {
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

    // Create pet
    const pet = await Pet.create({
      name: name.trim(),
      type: type.toLowerCase(),
      dateOfBirth,
      lastVaccinationDate: lastVaccinationDate || null,
      weight: parseFloat(weight),
      ownerName: ownerName.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Pet created successfully',
      data: pet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Update pet
// @route   PUT /api/pets/:id
// @access  Public
export const updatePet = async (req, res) => {
  try {
    const { name, type, dateOfBirth, lastVaccinationDate, weight, ownerName } = req.body;
    
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }

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
    
    pet.name = name.trim();
    pet.type = type.toLowerCase();
    pet.dateOfBirth = dateOfBirth;
    pet.lastVaccinationDate = lastVaccinationDate || null;
    pet.weight = parseFloat(weight);
    pet.ownerName = ownerName.trim();
    
    await pet.save();
    
    res.json({
      success: true,
      message: 'Pet updated successfully',
      data: pet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Delete pet
// @route   DELETE /api/pets/:id
// @access  Public
export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    await Pet.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Pet deleted successfully',
      data: pet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Search pets by name, type, or owner
// @route   GET /api/pets/search
// @access  Public
export const searchPets = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json({ 
        success: true, 
        count: 0,
        data: [] 
      });
    }
    
    const pets = await Pet.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
        { ownerName: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 }).limit(20);
    
    res.json({ 
      success: true, 
      count: pets.length,
      data: pets 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get pets by owner name
// @route   GET /api/pets/owner/:ownerName
// @access  Public
export const getPetsByOwner = async (req, res) => {
  try {
    const { ownerName } = req.params;
    
    const pets = await Pet.find({ 
      ownerName: { $regex: ownerName, $options: 'i' } 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get pets by type
// @route   GET /api/pets/type/:type
// @access  Public
export const getPetsByType = async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validate pet type
    const validTypes = ['dog', 'cat', 'cow', 'other'];
    if (!validTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Pet type must be one of: dog, cat, cow, other'
      });
    }
    
    const pets = await Pet.find({ 
      type: type.toLowerCase() 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get pet statistics
// @route   GET /api/pets/stats
// @access  Public
export const getPetStats = async (req, res) => {
  try {
    const totalPets = await Pet.countDocuments();
    
    const petsByType = await Pet.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const averageWeight = await Pet.aggregate([
      {
        $group: {
          _id: null,
          avgWeight: { $avg: '$weight' }
        }
      }
    ]);
    
    const recentPets = await Pet.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name type ownerName createdAt');
    
    res.json({
      success: true,
      data: {
        totalPets,
        petsByType,
        averageWeight: averageWeight[0]?.avgWeight || 0,
        recentPets
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
