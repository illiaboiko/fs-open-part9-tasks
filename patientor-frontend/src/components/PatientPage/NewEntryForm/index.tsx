import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import {
  Diagnosis,
  HealthCheckEntryFromValues,
  HealthCheckRating,
  entryTypes,
  EntryType,
  Discharge,
} from "../../../types";
import HealthCheckFields from "./HealthCheckFields";
import HospitalFields from "./HospitalFields";

interface Props {
  onCloseForm: () => void;
  onSubmit: (values: HealthCheckEntryFromValues) => void;
  error?: string;
  diagnoses: Diagnosis[];
}

const NewEntryForm = ({ onCloseForm, onSubmit, error, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("Hospital");

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  // states for HealthCheckrating type fields
  const [healthCheckRating, setHealthcheckRating] = useState(
    HealthCheckRating.Healthy
  );

  // states for Hospital type fields
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const onHealtcheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);
    if (value in HealthCheckRating) {
      setHealthcheckRating(value as HealthCheckRating);
    }
  };

  const toArray = (str: string): string[] => {
    return str.split(",").map((s) => s.trim());
  };

  const addEntry = (e: SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodesArray = toArray(diagnosisCodes);
    onSubmit({
      date,
      type: "HealthCheck",
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodesArray,
    });
  };

  return (
    <div>
      <Card>
        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography component="h2" variant="h5">
            Add new entry
          </Typography>
          <form>
            <InputLabel style={{ marginTop: 20 }}>type:</InputLabel>
            <Select
              label="entry-type"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value as EntryType)}
            >
              {entryTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="date"
              name="date"
              type="date"
              autoFocus
              // label="date"
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <TextField
              id="description"
              name="description"
              label="description"
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextField
              id="specialist"
              name="specialist"
              label="specialist"
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setSpecialist(e.target.value)}
              value={specialist}
            />
            <TextField
              id="diagnosis-codes"
              name="diagnosis-codes"
              label="Diagnosis Codes"
              size="small"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={(e) => setDiagnosisCodes(e.target.value)}
              value={diagnosisCodes}
            />
            {entryType === "HealthCheck" && (
              <HealthCheckFields
                healthCheckRating={healthCheckRating}
                onHealtcheckRatingChange={onHealtcheckRatingChange}
              />
            )}
            {entryType === "Hospital" && (
              <HospitalFields
                discharge={discharge}
                onDischargeChange={(obj: Discharge) => setDischarge(obj)}
              />
            )}

            <Box
              sx={{
                marginBlockStart: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" color="primary" onClick={addEntry}>
                Add
              </Button>
              <Button variant="contained" color="error" onClick={onCloseForm}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEntryForm;
