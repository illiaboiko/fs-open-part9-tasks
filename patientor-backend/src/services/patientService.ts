import patientsData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getNonSensitiveEntry,
  addPatient,
  findById,
};
