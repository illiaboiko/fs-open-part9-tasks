import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PatientEntries from "./PatientEntries";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) return;
      const patientData = await patientService.getById(id);
      setPatient(patientData);
    };
    void fetchPatientData();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnosisService.getAll();
      setDiagnoses(diagnosesData);
    };

    void fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h3>
          {patient.name}
          {patient.gender === "female" ? (
            <FemaleIcon />
          ) : patient.gender === "male" ? (
            <MaleIcon />
          ) : null}
        </h3>
      </div>
      <div className="description">
        <p>ssn: **sensitive data**</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <PatientEntries entries={patient.entries} diagnoses={diagnoses} />
    </>
  );
};

export default PatientPage;
