import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SickLeave } from "../../../types";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Props {
  employerName: string;
  sickLeave: SickLeave | undefined;
  onEmployerNameChange: (name: string) => void;
  onSickLeaveChange: (obj: SickLeave | undefined) => void;
}
const OccupationalFields = ({
  employerName,
  sickLeave,
  onEmployerNameChange,
  onSickLeaveChange,
}: Props) => {
  return (
    <>
      <Typography>Employer Name: </Typography>
      <TextField
        id="employerName"
        type="text"
        name="employerName"
        size="small"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => {
          onEmployerNameChange(e.target.value);
        }}
        value={employerName}
      />

      <Typography sx={{ marginBlockEnd: 1 }}>Sick Leave: </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(sickLeave)}
            onChange={(e) =>
              onSickLeaveChange(
                e.target.checked ? { startDate: "", endDate: "" } : undefined
              )
            }
          />
        }
        label="Add sick leave"
      />

      {sickLeave && (
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={
                  sickLeave.startDate ? new Date(sickLeave.startDate) : undefined
                }
                onChange={(newDate) => {
                  const isValid =
                    newDate instanceof Date && !isNaN(newDate.getTime());
                  onSickLeaveChange({
                    ...sickLeave,
                    startDate: isValid
                      ? newDate.toISOString().slice(0, 10)
                      : "",
                  });
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />

              <DatePicker
                label="End Date"
                value={sickLeave.endDate ? new Date(sickLeave.endDate) : undefined}
                onChange={(newDate) => {
                  const isValid =
                    newDate instanceof Date && !isNaN(newDate.getTime());
                  onSickLeaveChange({
                    ...sickLeave,
                    endDate: isValid ? newDate.toISOString().slice(0, 10) : "",
                  });
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Box>
          </LocalizationProvider>
        </FormControl>
      )}
    </>
  );
};

export default OccupationalFields;
