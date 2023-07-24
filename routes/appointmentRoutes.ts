import express from 'express';
import appointmentController from '../controllers/appointmentController';

const router = express.Router();

// Ruta para crear una nueva cita médica
router.post('/appointments', appointmentController.createAppointment);

// Ruta para obtener todas las citas médicas
router.get('/appointments', appointmentController.getAllAppointments);

// Ruta para obtener una cita médica por su ID
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Ruta para eliminar una cita médica por su ID
router.delete('/appointments/:id', appointmentController.deleteAppointmentById);

export default router;
