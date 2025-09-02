import express from 'express';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  searchPets,
  getPetsByOwner,
  getPetsByType,
  getPetStats
} from '../controllers/PetController.js';

const router = express.Router();

// Routes
router.get('/search', searchPets);
router.get('/stats', getPetStats);
router.get('/owner/:ownerName', getPetsByOwner);
router.get('/type/:type', getPetsByType);
router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;