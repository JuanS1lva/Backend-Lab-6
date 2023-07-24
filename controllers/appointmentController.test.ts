// appointmentController.test.ts

import { Request, Response } from 'express';
import appointmentController from './appointmentController';
import Appointment from '../models/appointmentModel';

// Mock de una función para simular el comportamiento de `Appointment.save`
jest.mock('../models/appointmentModel', () => ({
  save: jest.fn(),
}));

describe('appointmentController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;

  beforeEach(() => {
    // Limpiar el mock antes de cada prueba
    jest.clearAllMocks();
  });

  test('createAppointment should create a new appointment', async () => {
    const mockAppointmentData = {
      numeroDocumentoPaciente: '1234567890',
      especialidad: 'Medicina general',
    };

    mockRequest.body = mockAppointmentData;

    const mockSave = jest.spyOn(Appointment.prototype, 'save');
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await appointmentController.createAppointment(mockRequest, mockResponse);

    expect(mockSave).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Cita médica creada exitosamente' });
  });

  test('createAppointment should handle error when saving appointment', async () => {
    const mockAppointmentData = {
      numeroDocumentoPaciente: '1234567890',
      especialidad: 'Medicina general',
    };

    mockRequest.body = mockAppointmentData;

    // Forzar un error en el mock de save
    (Appointment.prototype.save as jest.Mock).mockRejectedValue(new Error('Error al guardar la cita médica'));

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await appointmentController.createAppointment(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Error al crear la cita médica', error: 'Error al guardar la cita médica' });
  });

});
