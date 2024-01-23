"use client";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

const CustomValueSelect = <T,>({
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
        renderValue={(selected) => {
          return (
            <Box display="flex" height="23px">
              <Chip size="small" label={selected[0]} />
              {selected.length > 1 ? (
                <Chip size="small" label={"+" + (selected.length - 1)} />
              ) : (
                ""
              )}
            </Box>
          );
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomValueSelect;
