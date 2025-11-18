import { Diagnosis, Entry } from "../../../types";
import EntryCard from "./Entry";

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntries = ({ entries, diagnoses }: Props) => {
  if (entries.length === 0) {
    return <div>no entries yet..</div>;
  }
  return (
    <>
      <h3>entries</h3>
      {entries.map((entry) => (
        <EntryCard  entry={entry} diagnoses={diagnoses} key={entry.id} />
      ))}
    </>
  );
};

export default PatientEntries;
