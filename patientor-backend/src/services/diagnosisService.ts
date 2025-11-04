import diagnosesEntries from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnosisData = (): Diagnosis[] => {
  return diagnosesEntries;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosisData,
  addDiagnosis,
};
