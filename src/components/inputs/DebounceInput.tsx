"use client";
import useDebounce from "@/hooks/useDebounce";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const DebounceInput = <T,>({
  defaultValue,
  label,
  onChange,
}: {
  defaultValue: string;
  label: string;
  onChange: (i: string) => void;
}) => {
  // todo There is a bug with the back button
  const [search, setSearch] = useState(defaultValue);
  const onChangeDebounced = useDebounce(search, 500);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
  };
  useEffect(() => {
    onChange(search);
  }, [onChangeDebounced]);
  return (
    <TextField
      sx={{ width: "12rem" }}
      label={label}
      id="search-field"
      value={search}
      onChange={handleChange}
    />
  );
};

export default DebounceInput;
