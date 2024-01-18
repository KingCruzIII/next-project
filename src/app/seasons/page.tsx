import { redirect } from "next/navigation";

const CurrentSeason = () => {
  const getSeason = (d: Date) => Math.floor((d.getMonth() / 12) * 4) % 4;
  const date = new Date();
  const seasonYear = date.getFullYear().toString();
  const season = ["winter", "spring", "summer", "fall"][getSeason(new Date())];

  return redirect(`/seasons/${seasonYear}/${season}`);
};

export default CurrentSeason;
