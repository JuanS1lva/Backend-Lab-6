import express from 'express';
import patientController from '../controllers/patientController';

const router = express.Router();

// Ruta para crear un nuevo paciente
router.post('/patients', patientController.createPatient);

// Ruta para obtener todos los pacientes
router.get('/patients', patientController.getAllPatients);

// Ruta para obtener un paciente por su ID
router.get('/patients/:id', patientController.getPatientById);

// Ruta para actualizar un paciente por su ID
router.put('/patients/:id', patientController.updatePatientById);

// Ruta para eliminar un paciente por su ID
router.delete('/patients/:id', patientController.deletePatientById);

export default router;
