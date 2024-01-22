"use client";
import dayjs from "dayjs";
import { Box, MenuItem } from "@mui/material";
import GeneralSelect from "./inputs/GeneralSelect";
import { useRouter, useParams } from "next/navigation";

const YearSelector = ({ value }: { value: string | number }) => {
  const { seasonYear, season } = useParams();
  const date = dayjs(new Date(Number(seasonYear), 1, 1));
  // const minDate = dayjs(new Date(Number(1990), 1, 1));
  const maxDate = dayjs(dayjs(new Date()).add(1, "year"));
  const router = useRouter();
  console.log(new Date().getFullYear());
  const getYears = () => {
    let ret: React.ReactNode[] = [];
    for (let i = 1990; i < new Date().getFullYear() + 1; i++) {
      ret.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return ret;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <GeneralSelect id="year-select" label="Year" value={value}>
        {getYears()}
      </GeneralSelect>
    </Box>
  );
};

export default YearSelector;
