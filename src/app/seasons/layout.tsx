import YearSelector from "@/components/YearSelector";
import SeasonSelector from "@/components/SeasonSelector";
import { Divider } from "@mui/material";
const SeasonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <YearSelector />
      <SeasonSelector />
      <Divider flexItem variant="middle" />
      {children}
    </>
  );
};

export default SeasonsLayout;
