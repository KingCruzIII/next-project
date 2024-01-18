import { Box, Divider } from "@mui/material";
import YearSelector from "@/components/YearSelector";
import SeasonSelector from "@/components/SeasonSelector";
const SeasonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <YearSelector />
      </Box>
      <SeasonSelector />
      <Divider flexItem variant="middle" />
      {children}
    </>
  );
};

export default SeasonsLayout;
