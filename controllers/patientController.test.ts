// patientController.test.ts

import { Request, Response } from 'express';
import patientController from './patientController';
import Patient from '../models/patientModel';

// Mock de una función para simular el comportamiento de `Patient.save`
jest.mock('../models/patientModel', () => ({
  save: jest.fn(),
}));

describe('patientController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;

  beforeEach(() => {
    // Limpiar el mock antes de cada prueba
    jest.clearAllMocks();
  });

  test('createPatient should create a new patient', async () => {
    const mockPatientData = {
      nombre: 'John',
      numeroCedula: '1234567890',
      apellido: 'Doe',
      edad: 30,
      telefono: '555-1234',
    };

    mockRequest.body = mockPatientData;

    const mockSave = jest.spyOn(Patient.prototype, 'save');
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await patientController.createPatient(mockRequest, mockResponse);

    expect(mockSave).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Paciente creado exitosamente' });
  });

  test('createPatient should handle error when saving patient', async () => {
    const mockPatientData = {
      nombre: 'John',
      numeroCedula: '1234567890',
      apellido: 'Doe',
      edad: 30,
      telefono: '555-1234',
    };

    mockRequest.body = mockPatientData;

    // Forzar un error en el mock de save
    (Patient.prototype.save as jest.Mock).mockRejectedValue(new Error('Error al guardar el paciente'));

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await patientController.createPatient(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Error al crear el paciente', error: 'Error al guardar el paciente' });
  });

});
