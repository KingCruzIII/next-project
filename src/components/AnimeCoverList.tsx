"use client";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Link as MuiLink, Paper, Tooltip } from "@mui/material";
import { GmpMediaFragment } from "@/generated/graphql";

const AnimeCoverList = ({
  list,
}: {
  list: Array<GmpMediaFragment | null> | null | undefined;
}) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {list?.map((item: GmpMediaFragment | null) => {
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
            sx={{ margin: "1rem .5rem .5rem .5rem", width: 230 }}
            key={item.id}
          >
            <Tooltip placement="top" title={title}>
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
                    src={item.coverImage?.large || ""}
                    alt={title}
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
                  {title}
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
