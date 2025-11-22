import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface Props {
  healthCheckRating: HealthCheckRating;
  onHealtcheckRatingChange: (event: SelectChangeEvent<string>) => void;
}

const healthcheckRatingOptions = Object.values(HealthCheckRating)
  .filter((value) => typeof value === "number")
  .map((v) => ({
    value: v as HealthCheckRating,
    label: HealthCheckRating[v as HealthCheckRating],
  }));

const HealthCheckFields = ({
  healthCheckRating,
  onHealtcheckRatingChange,
}: Props) => {
  return (
    <>
      <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
      <Select
        label="Health Rating"
        fullWidth
        value={healthCheckRating.toString()}
        onChange={onHealtcheckRatingChange}
      >
        {healthcheckRatingOptions.map((option) => (
          <MenuItem key={option.label} value={option.value.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default HealthCheckFields;
