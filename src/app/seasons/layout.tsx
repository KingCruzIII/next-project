import YearSelector from "@/components/YearSelector";
import SeasonSelector from "@/components/SeasonSelector";
const SeasonsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <YearSelector />
      <SeasonSelector />
      {children}
    </>
  );
};

export default SeasonsLayout;
