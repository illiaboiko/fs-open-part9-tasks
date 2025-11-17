import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) return;
      const patientData = await patientService.getById(id);
      setPatient(patientData);
    };
    void fetchPatientData();
  }, [id]);

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
    </>
  );
};

export default PatientPage;
