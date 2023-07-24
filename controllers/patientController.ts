import { Request, Response } from 'express';
import Patient from '../models/patientModel';

// Controlador para crear un nuevo paciente
const createPatient = async (req: Request, res: Response) => {
  try {
    const { nombre, numeroCedula, apellido, edad, telefono } = req.body;

    const patient = new Patient({
      nombre,
      numeroCedula,
      apellido,
      edad,
      telefono,
    });

    await patient.save();

    res.status(201).json({ message: 'Paciente creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paciente', error });
  }
};

// Controlador para obtener todos los pacientes
const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error });
  }
};

// Controlador para obtener un paciente por su ID
const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el paciente', error });
  }
};

// Controlador para actualizar un paciente por su ID
const updatePatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, numeroCedula, apellido, edad, telefono } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      id,
      {
        nombre,
        numeroCedula,
        apellido,
        edad,
        telefono,
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error });
  }
};

// Controlador para eliminar un paciente por su ID
const deletePatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findByIdAndDelete(id);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error });
  }
};

export default {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
