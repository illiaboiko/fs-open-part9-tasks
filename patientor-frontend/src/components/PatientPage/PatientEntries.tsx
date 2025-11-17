import { Entry } from "../../types";

interface Props {
  entries: Entry[];
}

const PatientEntries = ({ entries }: Props) => {
  if (!entries) {
    return <div>Loading...</div>;
  }
  if (entries.length === 0) {
    return <div>no entries yet..</div>;
  }
  return (
    <>
      <h3>entries</h3>
      {entries.map((entry) => (
        <p>
          <span>{entry.date}</span> {entry.description}
          <ul>
            {entry.diagnosisCodes?.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </p>
      ))}
    </>
  );
};

export default PatientEntries;
