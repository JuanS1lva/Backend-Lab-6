import { Schema, model, Document } from 'mongoose';

interface PatientData {
  nombre: string;
  numeroCedula: string;
  apellido: string;
  edad: number;
  telefono: string;
}

interface PatientDocument extends PatientData, Document {}

const patientSchema = new Schema<PatientDocument>(
  {
    nombre: {
      type: String,
      required: true,
    },
    numeroCedula: {
      type: String,
      required: true,
      unique: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = model<PatientDocument>('Patient', patientSchema);

export default Patient;
