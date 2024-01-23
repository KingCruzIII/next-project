"use client";
import React from "react";
import { FormControl, InputLabel, OutlinedInput, Select } from "@mui/material";

const GeneralSelect = ({
  children,
  value,
  label,
  id,
  defaultValue,
}: {
  value: React.ReactNode;
  defaultValue?: React.ReactNode;
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
        defaultValue=""
        input={<OutlinedInput id={id + "-input"} label={label} />}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default GeneralSelect;
