import { SickLeave } from "../../../../../types";
import { Typography } from "@mui/material";

interface Props {
  employerName: string;
  sickLeave?: SickLeave; 
}
const OccupationalHealthcareDetails = ({employerName, sickLeave}:Props) => {
  return (
    <>
      <Typography variant="body2">
      {employerName}
      </Typography> 
      {sickLeave && (
        <div>
          SickLeave: {sickLeave.startDate} - {sickLeave.endDate}
        </div>
      ) }
    </>
  );
};

export default OccupationalHealthcareDetails;


