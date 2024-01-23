"use client";
import { Box, Chip, MenuItem, TextField, debounce } from "@mui/material";

import { GetGenreCollectionQuery, MediaSeason } from "@/generated/graphql";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import CustomValueSelect from "./inputs/CustomValueSelect";
import Link from "next/link";
import GeneralSelect from "./inputs/GeneralSelect";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { Sell } from "@mui/icons-material";

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

  const paramYear = searchParams.get("year") || "";
  const paramSeason = searchParams.get("season") || "";
  const paramSearch = searchParams.get("search") || "";
  const paramGenres = searchParams.getAll("genres");

  // adds query param:allows for multiple of the same param
  const addParam = (name: string, value: string) => {
    let params = getSearchParamsObject(searchParams);

    if (!params[name]) {
      params[name] = [value];
    } else {
      if (!params[name].find((item) => item === value))
        params[name].push(value);
    }
    return convertObjectToParamString(params);
  };

  // replaces query param: does not allow for multiple of the same param
  const replaceParam = useCallback(
    (name: string, value: string) => {
      let params = getSearchParamsObject(searchParams);
      params[name] = [value];
      return convertObjectToParamString(params);
    },
    [searchParams]
  );

  // clears all params of a given value
  const clearParam = useCallback(
    (name: string) => {
      let params = getSearchParamsObject(searchParams);
      params[name] = [];
      router.push(pathname + "?" + convertObjectToParamString(params));
    },
    [searchParams]
  );

  const clearParamCurry = (v: string) => {
    return () => clearParam(v);
  };

  // deletes a single param by name and value
  const deleteParam = useCallback(
    (name: string, value: string) => {
      let params = getSearchParamsObject(searchParams);
      params[name] = params[name].filter((item) => item !== value);
      console.log(params[name]);
      router.push(pathname + "?" + convertObjectToParamString(params));
    },
    [searchParams]
  );

  const deleteParamCurry = (n: string, v: string) => {
    return () => deleteParam(n, v);
  };

  const [search, setSearch] = useState(paramSearch);
  const onChangeDebounced = useDebounce(search, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Handle keeping the query param in sync with the state
  // Doing this way keeps history working like you would expect, and default value population
  useEffect(() => {
    // If the state and parm are different use param as source of truth
    if (paramSearch !== search) {
      setSearch(paramSearch);

      // handle if param is empty or not there separately
    } else if (paramSearch === null) {
      setSearch("");
    }

    // specifically only check state if search params change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle updating url "search" param
  useEffect(() => {
    // if the user input is empty delete the query param
    if (!onChangeDebounced) {
      clearParam("search");

      // Only update the query params if it has changed from what is already there
    } else if (paramSearch !== onChangeDebounced) {
      router.push(
        pathname + "?" + replaceParam("search", onChangeDebounced || "")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangeDebounced]);

  const nextYear = new Date().getFullYear() + 1;
  const dateCount = nextYear - 1990;
  return (
    <Box padding="0 5rem">
      <Box display="flex" padding="2rem 0 1rem" justifyContent="space-between">
        <TextField
          sx={{ width: "12rem" }}
          label="Search"
          id="search-field"
          value={search}
          onChange={handleSearchChange}
        />
        <GeneralSelect
          defaultValue={nextYear}
          id="year-select"
          label="Year"
          value={paramYear}
        >
          {Array.from(Array(dateCount), (_, index) => {
            const year = nextYear - index;
            return (
              <MenuItem
                // *shrug* https://github.com/mui/material-ui/issues/16846
                component={Link as any}
                href={pathname + "?" + replaceParam("year", year.toString())}
                key={"year-select-" + year}
                value={year || ""}
              >
                {year}
              </MenuItem>
            );
          })}
        </GeneralSelect>
        <CustomValueSelect
          id="genres-select"
          label="Genres"
          value={paramGenres}
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
        <GeneralSelect id="Season-select" label="Season" value={paramSeason}>
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
                value={season || ""}
              >
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </MenuItem>
            );
          })}
        </GeneralSelect>
      </Box>

      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Box
          visibility={
            paramYear || paramSeason || paramGenres.length
              ? "visible"
              : "hidden"
          }
        >
          <Sell color="disabled" />
        </Box>
        {paramYear && (
          <Box padding="0 .25rem">
            <Chip
              size="small"
              label={paramYear}
              onDelete={clearParamCurry("year")}
            />
          </Box>
        )}
        {paramSeason && (
          <Box padding="0 .25rem">
            <Chip
              size="small"
              label={paramSeason.charAt(0).toUpperCase() + paramSeason.slice(1)}
              onDelete={clearParamCurry("season")}
            />
          </Box>
        )}
        {paramGenres.map((item) => {
          return (
            <Box key={"tags-" + item} padding="0 .25rem">
              <Chip
                size="small"
                label={item}
                onDelete={deleteParamCurry("genres", item)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default QueryFilter;
