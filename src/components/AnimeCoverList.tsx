"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Link as MuiLink, Paper, Tooltip } from "@mui/material";

type MediaType = {
  title: {
    english: string;
    native: string;
  };
  description: string;
  id: number;
  coverImage: {
    large: string;
  };
};

const AnimeCoverList = ({ list = [] }: { list: MediaType[] }) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {list.map((item: MediaType) => {
        const description = item.description
          ? item.description
              .replaceAll(/(<i>|<br>|<\/i>|<\/br>)/g, "")
              .slice(0, 100)
              .trim()
          : "";
        return (
          <Paper
            sx={{ margin: "1rem .5rem .5rem .5rem", width: 230 }}
            key={item.id}
          >
            <Tooltip
              placement="top"
              title={item.title.english || item.title.native}
            >
              <Box display="flex" flexDirection="column">
                <MuiLink
                  underline="none"
                  component={NextLink}
                  width={230}
                  height={326}
                  href={`/anime/${item.id}`}
                >
                  <Image
                    width={230}
                    height={326}
                    src={item.coverImage.large}
                    alt={item.title.english || item.title.native}
                  />
                </MuiLink>
                <MuiLink
                  underline="none"
                  component={NextLink}
                  href={`/anime/${item.id}`}
                  maxWidth="230px"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  padding=".5rem"
                >
                  {item.title.english || item.title.native}
                </MuiLink>
              </Box>
            </Tooltip>
          </Paper>
        );
      })}
    </Box>
  );
};

export default AnimeCoverList;
