import { Request, Response } from 'express';
import Appointment from '../models/appointmentModel';

// Controlador para crear una nueva cita médica
const createAppointment = async (req: Request, res: Response) => {
  try {
    const { numeroDocumentoPaciente, especialidad } = req.body;

    // Aquí puedes realizar validaciones adicionales, como verificar si el paciente y el doctor existen en la base de datos antes de crear la cita.

    const appointment = new Appointment({
      numeroDocumentoPaciente,
      especialidad,
    });

    await appointment.save();

    res.status(201).json({ message: 'Cita médica creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita médica', error });
  }
};

// Controlador para obtener todas las citas médicas
const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas médicas', error });
  }
};

// Controlador para obtener una cita médica por su ID
const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita médica no encontrada' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita médica', error });
  }
};

// Controlador para eliminar una cita médica por su ID
const deleteAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita médica no encontrada' });
    }

    res.status(200).json({ message: 'Cita médica eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita médica', error });
  }
};

export default {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  deleteAppointmentById,
};