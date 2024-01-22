import { FormControl, InputLabel, TextField } from "@mui/material";

const GeneralInput = ({
  value,
  label,
  id,
}: {
  value: React.ReactNode;
  children: React.ReactNode;
  label: string;
  id: string;
}) => {
  return (
    <FormControl sx={{ width: "12rem" }}>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <TextField label={label} id={id} value={value} />
    </FormControl>
  );
};

export default GeneralInput;
