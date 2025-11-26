import { useEffect, useState } from "react";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PatientEntries from "./PatientEntries";
import NewEntryForm from "./NewEntryForm";
import { Button } from "@mui/material";
import axios from "axios";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showNewEntryForm, setShowNewEntryForm] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      setError("Cannot add entry: missing patinet ID");
      return;
    }
    try {
      const entry = await patientService.createEntry(values, id);
      setPatient((prev) =>
        prev
          ? {
              ...prev,
              entries: prev.entries ? prev.entries.concat(entry) : [entry],
            }
          : prev
      );
      setShowNewEntryForm(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "object") {
          const message = e.response.data.error[0].message;
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized Axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      {showNewEntryForm ? (
        <NewEntryForm
          onCloseForm={() => setShowNewEntryForm(false)}
          onSubmit={submitNewEntry}
          error={error}
          diagnoses={diagnoses}
        />
      ) : (
        <Button
          onClick={() => setShowNewEntryForm(true)}
          variant="contained"
          color="secondary"
        >
          Add entry
        </Button>
      )}
      <div className="description">
        <p>ssn: **sensitive data**</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <PatientEntries entries={patient.entries} diagnoses={diagnoses} />
    </>
  );
};

export default PatientPage;
