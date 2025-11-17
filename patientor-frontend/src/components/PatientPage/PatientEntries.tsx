import { Diagnosis, Entry } from "../../types";

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntries = ({ entries, diagnoses }: Props) => {
  const findDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((diag) => diag.code === code);
    return diagnosis ? diagnosis.name : "..no diagnosis name available";
  };

  if (entries.length === 0) {
    return <div>no entries yet..</div>;
  }
  return (
    <>
      <h3>entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <p>
            <strong>{entry.date}</strong> {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>
                {d} <span>{diagnoses ? findDiagnosisName(d) : 'no diagnoses data yet'}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PatientEntries;
