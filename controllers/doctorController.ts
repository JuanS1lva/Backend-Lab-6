import { Request, Response } from 'express';
import Doctor from '../models/doctorModel';

// Controlador para crear un nuevo doctor
const createDoctor = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, especialidad, consultorio, correo } = req.body;

    const doctor = new Doctor({
      nombre,
      apellido,
      especialidad,
      consultorio,
      correo,
    });

    await doctor.save();

    res.status(201).json({ message: 'Doctor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el doctor', error });
  }
};

// Controlador para obtener todos los doctores
const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los doctores', error });
  }
};

// Controlador para obtener un doctor por su ID
const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el doctor', error });
  }
};

// Controlador para actualizar un doctor por su ID
const updateDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, especialidad, consultorio, correo } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        especialidad,
        consultorio,
        correo,
      },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el doctor', error });
  }
};

// Controlador para eliminar un doctor por su ID
const deleteDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json({ message: 'Doctor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el doctor', error });
  }
};

export default {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
};






