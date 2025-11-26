import { Discharge } from "../../../types";
import { TextField, Typography } from "@mui/material";

interface Props {
  discharge: Discharge;
  onDischargeChange: (obj: Discharge) => void;
}
const HospitalFields = ({ discharge, onDischargeChange }: Props) => {
  return (
    <>
      <Typography>Discharge: </Typography>
      <TextField
        id="date"
        type="date"
        name="date"
        //   label="date"
        size="small"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => {
          onDischargeChange({ ...discharge, date: e.target.value });
        }}
        value={discharge.date}
      />
      <TextField
        id="criteria"
        type="criteria"
        name="criteria"
        label="criteria"
        size="small"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => {
          onDischargeChange({ ...discharge, criteria: e.target.value });
        }}
        value={discharge.criteria}
      />
    </>
  );
};

export default HospitalFields;
