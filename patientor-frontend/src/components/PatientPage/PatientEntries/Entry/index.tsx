import { Card, CardContent } from "@mui/material";
import { Diagnosis, type Entry } from "../../../../types";
import HealthCheckDetails from "./EntryDetails/HealthCheckDetails";
import HospitalDetails from "./EntryDetails/HospitalDetails";
import OccupationalHealthcareDetails from "./EntryDetails/OccupationalHealthcareDetails";
import { assertNever } from "../../../../utils";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryCard = ({ entry, diagnoses }: Props) => {
  const findDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((diag) => diag.code === code);
    return diagnosis ? diagnosis.name : "..no diagnosis name available";
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheckDetails healthCheckRating={entry.healthCheckRating}/>;

      case "Hospital":
        return <HospitalDetails  discharge={entry.discharge}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareDetails employerName={entry.employerName} sickLeave={entry.sickLeave}/>;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Card sx={{marginBlock: "0.5rem"}} variant="outlined" key={entry.id}>
      <CardContent>
        <p>
          <strong>{entry.date}</strong> {entry.description}
        </p>
        <ul>
          {entry.diagnosisCodes?.map((d) => (
            <li key={d}>
              {d}{" "}
              <span>
                {diagnoses ? findDiagnosisName(d) : "no diagnoses data yet"}
              </span>
            </li>
          ))}
        </ul>
        {EntryDetails({ entry })}
      </CardContent>
    </Card>
  );
};

export default EntryCard;
