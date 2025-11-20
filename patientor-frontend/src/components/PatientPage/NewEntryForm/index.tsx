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
import { HealthCheckEntryFromValues, HealthCheckRating } from "../../../types";

interface Props {
  error?: string
  onCloseForm: () => void;
  onSubmit: (values: HealthCheckEntryFromValues) => void;
}

// interface HealthcheckRatingOptions{
//   value: HealthCheckRating;
//   label: string;
// }

const healthcheckRatingOptions = Object.values(HealthCheckRating)
.filter((value)=> typeof value === "number")
.map(v => ({
  value: v as HealthCheckRating, label: HealthCheckRating[v as HealthCheckRating]
}));

const NewEntryForm = ({ onCloseForm, onSubmit , error}: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthcheckRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  // const onHealtcheckRatingChange = (event: SelectChangeEvent<string>) => {
  //   event.preventDefault();
  //   if ( typeof event.target.value === "string") {
  //     const value = event.target.value;
  //     const rating = Object.values(HealthCheckRating).find(g => g.toString() === value);
  //     if (rating) {
  //       setHealthcheckRating(rating);
  //     }
  //   }
  // }

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
            <TextField
              id="date"
              name="date"
              autoFocus
              label="date"
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
            {/* <FormControl fullWidth>
              <InputLabel id="healthcheck-rating-select-label">
                Healthcheck Rating
              </InputLabel>
              <Select
                labelId="healthcheck-rating-select-label"
                id="healthcheck-rating-select"
                label="Healthcheck Rating"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl> */}
<InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onHealtcheckRatingChange}
        >
        {healthcheckRatingOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value.toString()}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
{/*
            <TextField
              id="healthcheck-rating-select-label"
              name="healthcheck-rating-select-label"
              label="Healthcheck Rating"
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setHealthcheckRating(e.target.value)}
              value={healthCheckRating}
            />
*/}
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={addEntry}
              >
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
