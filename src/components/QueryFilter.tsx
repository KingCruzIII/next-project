"use client";
import { Box, MenuItem, TextField, debounce } from "@mui/material";

import { GetGenreCollectionQuery, MediaSeason } from "@/generated/graphql";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import CustomValueSelect from "./inputs/CustomValueSelect";
import Link from "next/link";
import GeneralSelect from "./inputs/GeneralSelect";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import DebounceInput from "./inputs/DebounceInput";

type QueryFilterProps = {
  genres: GetGenreCollectionQuery["GenreCollection"];
};

// Converts params to an object for easier modification
const getSearchParamsObject = (searchParams: ReadonlyURLSearchParams) => {
  const paramArrays = Array.from(searchParams.entries());

  const paramObject: Record<string, string[]> = {};
  return paramArrays.reduce((acc, val) => {
    if (!acc[val[0]]) {
      acc[val[0]] = [val[1]];
    } else {
      acc[val[0]].push(val[1]);
    }
    acc[val[0]];
    return acc;
  }, paramObject);
};

// Convert param object into an easy to read/mod query string
const convertObjectToParamString = (obj: Record<string, string[]>) => {
  const ret: string[][] = [];
  for (const [key, vals] of Object.entries(obj)) {
    vals.forEach((val) => ret.push([key, val]));
  }
  return new URLSearchParams(ret).toString();
};

const QueryFilter = ({ genres }: QueryFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const addParam = (name: string, value: string) => {
    let params = getSearchParamsObject(searchParams);
    if (!params[name]) {
      params[name] = [value];
    } else {
      params[name].push(value);
    }
    return convertObjectToParamString(params);
  };

  const replaceParam = useCallback(
    (name: string, value: string) => {
      let params = getSearchParamsObject(searchParams);
      params[name] = [value];
      return convertObjectToParamString(params);
    },
    [searchParams]
  );

  const deleteParam = useCallback(
    (name: string) => {
      let params = getSearchParamsObject(searchParams);
      params[name] = [];
      return convertObjectToParamString(params);
    },
    [searchParams]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!value) {
        router.push(pathname + "?" + deleteParam("search"));
      } else if (searchParams.get("search") !== value) {
        router.push(pathname + "?" + replaceParam("search", value || ""));
      }
    },
    [searchParams, replaceParam, router, pathname]
  );

  const nextYear = new Date().getFullYear() + 1;
  const dateCount = nextYear - 1990;
  const setDate = searchParams.getAll("year");

  return (
    <Box display="flex" flexDirection="column" padding="2rem 0 0 0 ">
      <DebounceInput
        label="Search"
        id="search-field"
        defaultValue={searchParams.getAll("search")[0]}
        onChange={handleSearchChange}
      />
      <GeneralSelect id="year-select" label="Year" value={setDate}>
        {Array.from(Array(dateCount), (_, index) => {
          const year = nextYear - index;
          return (
            <MenuItem
              // *shrug* https://github.com/mui/material-ui/issues/16846
              component={Link as any}
              href={pathname + "?" + replaceParam("year", year.toString())}
              key={"year-select-" + year}
              value={year}
            >
              {year}
            </MenuItem>
          );
        })}
      </GeneralSelect>
      <CustomValueSelect
        id="genres-select"
        label="Genres"
        value={searchParams.getAll("genres")}
      >
        {genres?.map((item, index) => {
          return (
            <MenuItem
              component={Link as any}
              href={pathname + "?" + addParam("genres", item || "")}
              key={"genre-item-" + index}
              value={item || ""}
            >
              {item}
            </MenuItem>
          );
        })}
      </CustomValueSelect>
      <GeneralSelect
        id="Season-select"
        label="Season"
        value={searchParams.getAll("season")}
      >
        {[
          MediaSeason.Winter,
          MediaSeason.Spring,
          MediaSeason.Summer,
          MediaSeason.Fall,
        ].map((item) => {
          const season = item.toLowerCase();
          return (
            <MenuItem
              component={Link as any}
              href={pathname + "?" + replaceParam("season", season)}
              key={"season-select" + season}
              value={season}
            >
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </MenuItem>
          );
        })}
      </GeneralSelect>
    </Box>
  );
};

export default QueryFilter;
