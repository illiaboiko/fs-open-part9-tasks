import {  useState } from "react";
import { Discharge } from "../../../types";
import { TextField, Typography } from "@mui/material";

interface Props {
discharge: Discharge
onDischargeChange: (obj: Discharge) => void
}
const HospitalFields = ({discharge, onDischargeChange }:Props) => {

    const [date, setDate] = useState(discharge.date);
    const [criteria, setCriteria] = useState(discharge.criteria);

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
                setDate(e.target.value);
                onDischargeChange({date: e.target.value, criteria: criteria});
              }}
              value={date}
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
                setCriteria(e.target.value);
                onDischargeChange({date: date, criteria: e.target.value});
              }}
              value={criteria}
            />

    </>
  );
};

export default HospitalFields;
