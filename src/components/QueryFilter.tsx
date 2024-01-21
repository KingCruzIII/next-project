"use client";
import { Box, MenuItem } from "@mui/material";

import { GetGenreCollectionQuery } from "@/generated/graphql";
import { usePathname, useSearchParams } from "next/navigation";
import CustomValueInput from "./inputs/CustomValueInput";
import Link from "next/link";
type QueryFilterProps = {
  genres: GetGenreCollectionQuery["GenreCollection"];
};
const QueryFilter = ({ genres }: QueryFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createGroupQueryString = (name: string, value: string) => {
    let items = searchParams.getAll(name);
    if (!items.find((item) => item === value)) items.push(value);
    const compiledParams = items.map((item) => [name, item]);
    return new URLSearchParams(compiledParams).toString();
  };

  return (
    <>
      <Box display="flex" flexDirection="column" padding="2rem 0 0 0 ">
        <CustomValueInput
          id="genres-select"
          label="Genres"
          value={searchParams.getAll("genres")}
        >
          {genres?.map((item, index) => {
            const handleThing = () => {};

            return (
              <MenuItem
                // *shrug* https://github.com/mui/material-ui/issues/16846
                component={Link as any}
                onClick={handleThing}
                key={"genre-item-" + index}
                value={item || ""}
                href={
                  pathname + "?" + createGroupQueryString("genres", item || "")
                }
              >
                {item}
              </MenuItem>
            );
          })}
        </CustomValueInput>
      </Box>
    </>
  );
};

export default QueryFilter;
