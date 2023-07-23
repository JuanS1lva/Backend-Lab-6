import mongoose, { Schema, Document } from 'mongoose';

// Interfaz que representa los datos de un doctor
interface IDoctor extends Document {
  nombre: string;
  apellido: string;
  especialidad: string;
  consultorio: string;
  correo: string;
}

// Define el esquema del modelo de datos para los doctores
const doctorSchema = new Schema<IDoctor>({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  especialidad: {
    type: String,
    required: true,
  },
  consultorio: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
});

// Crea y exporta el modelo de datos para los doctores
export default mongoose.model<IDoctor>('Doctor', doctorSchema);


