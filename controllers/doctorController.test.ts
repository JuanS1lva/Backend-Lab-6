// doctorController.test.ts

import { Request, Response } from 'express';
import doctorController from './doctorController';
import Doctor from '../models/doctorModel';

// Mock de una función para simular el comportamiento de `Doctor.save`
jest.mock('../models/doctorModel', () => ({
  save: jest.fn(),
}));

describe('doctorController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {} as Response;

  beforeEach(() => {
    // Limpiar el mock antes de cada prueba
    jest.clearAllMocks();
  });

  test('createDoctor should create a new doctor', async () => {
    const mockDoctorData = {
      nombre: 'John',
      apellido: 'Doe',
      especialidad: 'Medicina general',
      consultorio: '123',
      correo: 'johndoe@example.com',
    };

    mockRequest.body = mockDoctorData;

    const mockSave = jest.spyOn(Doctor.prototype, 'save');
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await doctorController.createDoctor(mockRequest, mockResponse);

    expect(mockSave).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Doctor creado exitosamente' });
  });

  test('createDoctor should handle error when saving doctor', async () => {
    const mockDoctorData = {
      nombre: 'John',
      apellido: 'Doe',
      especialidad: 'Medicina general',
      consultorio: '123',
      correo: 'johndoe@example.com',
    };

    mockRequest.body = mockDoctorData;

    // Forzar un error en el mock de save
    (Doctor.prototype.save as jest.Mock).mockRejectedValue(new Error('Error al guardar el doctor'));

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockResponse.status = mockStatus;

    await doctorController.createDoctor(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Error al crear el doctor', error: 'Error al guardar el doctor' });
  });

});
