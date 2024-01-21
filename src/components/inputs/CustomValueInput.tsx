"use client";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import ChipValue from "./ChipValue";
import React from "react";

const CustomValueInput = <T,>({
  children,
  value,
  label,
  id,
}: {
  value: React.ReactNode[];
  children: React.ReactNode;
  label: string;
  id: string;
}) => {
  return (
    <FormControl sx={{ width: "12rem" }}>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select
        labelId={id + "-label"}
        id={id}
        multiple
        value={value}
        input={<OutlinedInput id={id + "-input"} label={label} />}
        renderValue={(selected) =>
          selected?.map((value: React.ReactNode) => (
            <ChipValue key={value?.toString()} value={value} />
          ))
        }
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomValueInput;
