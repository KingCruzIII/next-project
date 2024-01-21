"use client";
import { Tab, Tabs } from "@mui/material";
import NextLink from "next/link";
import { useParams } from "next/navigation";

const SeasonSelector = () => {
  const seasons = ["winter", "spring", "summer", "fall"];
  const { season } = useParams();
  return (
    <>
      <Tabs value={seasons.findIndex((item) => item == season)} centered>
        {seasons.map((item) => (
          <Tab
            key={`season-selector-` + item}
            LinkComponent={NextLink}
            href={item}
            label={item.charAt(0).toUpperCase() + item.slice(1)}
          />
        ))}
      </Tabs>
    </>
  );
};

export default SeasonSelector;
