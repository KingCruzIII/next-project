"use client";
import { LocalizationProvider, YearCalendar } from "@mui/x-date-pickers";
import { Box, Button, Menu } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const YearSelector = () => {
  const { seasonYear, season } = useParams();
  const date = dayjs(new Date(Number(seasonYear), 1, 1));
  const minDate = dayjs(new Date(Number(1990), 1, 1));
  const maxDate = dayjs(dayjs(new Date()).add(1, "year"));

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDateChange = (date: dayjs.Dayjs) => {
    handleClose();
    router.push(`/seasons/${date.year().toString()}/${season}`);
  };

  return (
    <Box padding="1rem 0 0 0" width="4rem">
      <Button
        size="large"
        variant="text"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {seasonYear}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <YearCalendar
            minDate={minDate}
            maxDate={maxDate}
            defaultValue={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Menu>
    </Box>
  );
};

export default YearSelector;
