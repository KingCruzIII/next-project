"use client";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";
import React from "react";

const GeneralSelect = ({
  children,
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
      <Select
        labelId={id + "-label"}
        id={id}
        value={value}
        input={<OutlinedInput id={id + "-input"} label={label} />}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default GeneralSelect;
