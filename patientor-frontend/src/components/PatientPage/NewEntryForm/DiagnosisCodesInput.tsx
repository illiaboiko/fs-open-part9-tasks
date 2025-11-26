import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Diagnosis } from "../../../types";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  value: string[];
  diagnoses: Diagnosis[];
  onChange: (codes: string[]) => void;
}

export default function DiagnosisCodesInput({
  value,
  diagnoses,
  onChange,
}: Props) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value: selected } = event.target;
    const codes = typeof selected === "string" ? selected.split(",") : selected;
    onChange(codes);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginBlock: 1 }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          id="diagnosis-codes"
          multiple
          value={value}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          input={<OutlinedInput label="Diagnosis Codes" />}
          MenuProps={MenuProps}
        >
          {diagnoses.map((d) => (
            <MenuItem
              key={d.code}
              value={d.code}
              sx={{
                fontWeight: value.includes(d.code) ? 700 : 300,
              }}
            >
              {d.code} - {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
