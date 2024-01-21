import { Box, Chip } from "@mui/material";

const ChipValue = ({ value }: { value: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      <Chip label={value} />
    </Box>
  );
};

export default ChipValue;
