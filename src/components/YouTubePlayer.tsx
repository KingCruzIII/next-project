"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";

type YouTubePlayerPropType = {
  videoId: string;
  title?: string;
  height?: number;
  width?: number;
};

const YouTubePlayer = ({
  videoId,
  title,
  height,
  width,
}: YouTubePlayerPropType) => {
  const small = [195, 320];
  const large = [390, 640];
  let compOps;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  if (sm)
    compOps = {
      height: "195",
      width: "320",
    };
  if (md)
    compOps = {
      height: "351",
      width: "576",
    };
  if (md)
    compOps = {
      height: "390",
      width: "640",
    };

  // width="560" height="315"

  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      width={width || compOps?.width}
      height={height || compOps?.height}
      src={url}
      title={title}
    />
  );
};

export default YouTubePlayer;
