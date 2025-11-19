import patientsData from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntryWithoutId,
  Entry,
} from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};

const getNonSensitiveEntry = (id: string): NonSensitivePatient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...rest } = patient;
  return rest;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: crypto.randomUUID(),
    ...entry,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntryWithoutId): Entry => {
  const newEntry = {
    id: crypto.randomUUID(),
    ...entry,
  };
  const patientToUpdate = patientsData.find(p=> p.id === patientId);
  patientToUpdate?.entries.push(newEntry);
  
  return newEntry;

};

export default {
  getEntries,
  getNonSensitiveEntries,
  getNonSensitiveEntry,
  addPatient,
  findById,
  addEntry,
};
