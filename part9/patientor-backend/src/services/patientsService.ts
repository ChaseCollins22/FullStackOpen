import patients from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';


const getAllPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };

const addPatient = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
    ) {
        const newPatient: Patient = {
          id: uuid(),
          ...object
        };

        return newPatient;
      }

    throw new Error('Invalid or missing data');
  };


  

export default {
  getAllPatients,
  getNonSensitivePatients
};