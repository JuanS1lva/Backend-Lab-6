const express = require('express');
import doctorController from '../controllers/doctorController';

const router = express.Router();

// Ruta para crear un nuevo doctor
router.post('/doctors', doctorController.createDoctor);

// Ruta para obtener todos los doctores
router.get('/doctors', doctorController.getAllDoctors);

// Ruta para obtener un doctor por su ID
router.get('/doctors/:id', doctorController.getDoctorById);

// Ruta para actualizar un doctor por su ID
router.put('/doctors/:id', doctorController.updateDoctorById);

// Ruta para eliminar un doctor por su ID
router.delete('/doctors/:id', doctorController.deleteDoctorById);

export default router;