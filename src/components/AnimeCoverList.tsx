"use client";
import Image from "next/image";
import NextLink from "next/link";
import { GmpMediaFragment } from "@/generated/graphql";
import { Box, Link as MuiLink, Paper, Tooltip } from "@mui/material";

const AnimeCoverList = ({
  list,
  size,
}: {
  list: Array<GmpMediaFragment | null | undefined> | null | undefined;
  size: "small" | "large";
}) => {
  let sizes: number[] = [];
  switch (size) {
    case "small":
      sizes = [115, 163];
      break;
    case "large":
    default:
      sizes = [230, 326];
      break;
  }
  return (
    <>
      {list?.map((item: GmpMediaFragment | null | undefined) => {
        if (!item) return "";
        const description = item.description
          ? item.description
              .replaceAll(/(<i>|<br>|<\/i>|<\/br>)/g, "")
              .slice(0, 100)
              .trim()
          : "";
        const title = item.title?.english || item.title?.native || "";
        return (
          <Paper
            sx={{ margin: "1rem .5rem .5rem .5rem", width: sizes[0] }}
            key={item.id}
          >
            <Tooltip placement="top" title={title}>
              <Box display="flex" flexDirection="column">
                <MuiLink
                  underline="none"
                  component={NextLink}
                  width={sizes[0]}
                  height={sizes[1]}
                  href={`/anime/${item.id}`}
                >
                  <Image
                    width={sizes[0]}
                    height={sizes[1]}
                    src={item.coverImage?.large || ""}
                    alt={title}
                  />
                </MuiLink>
                {title && (
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
                    {title}
                  </MuiLink>
                )}
              </Box>
            </Tooltip>
          </Paper>
        );
      })}
    </>
  );
};

export default AnimeCoverList;
