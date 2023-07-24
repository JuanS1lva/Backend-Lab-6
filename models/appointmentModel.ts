import { Schema, model, Document } from 'mongoose';

interface AppointmentData {
  numeroDocumentoPaciente: string;
  especialidad: string;
}

interface AppointmentDocument extends AppointmentData, Document {}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    numeroDocumentoPaciente: {
      type: String,
      required: true,
    },
    especialidad: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = model<AppointmentDocument>('Appointment', appointmentSchema);

export default Appointment;
