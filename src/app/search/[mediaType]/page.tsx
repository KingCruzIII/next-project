import { Box } from "@mui/material";
import { getClient } from "@/clients/anilist";
import QueryFilter from "@/components/QueryFilter";
import AnimeCoverList from "@/components/AnimeCoverList";
import { GetMediaPages } from "@/graphql/GetMediaPages.graphql";
import { GetGenreCollection } from "@/graphql/GetGenreCollection.graphql";
import {
  GetGenreCollectionQuery,
  GetMediaPagesQuery,
  MediaSeason,
} from "@/generated/graphql";

type SearchPagePropType = {
  params: { year: string; season: string };
  searchParams: Record<string, string | string[]>;
};

const SearchPage = async ({ params, searchParams }: SearchPagePropType) => {
  console.log(searchParams);
  const paramYear = searchParams.year?.toString() || "";
  const paramSeason = searchParams.season?.toString() || "";
  const paramSearch = searchParams.search?.toString() || null;
  const paramGenres = searchParams.genres;

  const getSeason = (d: Date) => Math.floor((d.getMonth() / 12) * 4) % 4;
  const date = new Date();
  const defaultSeasonYear = date.getFullYear().toString();
  const defaultSeason = [
    MediaSeason.Winter,
    MediaSeason.Spring,
    MediaSeason.Summer,
    MediaSeason.Fall,
  ][getSeason(new Date())];

  const defaultParams = {
    year: paramYear || parseInt(defaultSeasonYear),
    season: paramSeason.toUpperCase() || defaultSeason,
    genres: paramGenres,
    search: paramSearch,
    sort: "SEARCH_MATCH",
  };

  const genreQuery = await getClient().query<GetGenreCollectionQuery>({
    query: GetGenreCollection,
  });

  const mediaQuery = await getClient().query<GetMediaPagesQuery>({
    query: GetMediaPages,
    variables: { ...defaultParams },
  });

  return (
    <Box margin="auto">
      <QueryFilter genres={genreQuery.data.GenreCollection} />
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <AnimeCoverList
          size="large"
          list={mediaQuery?.data?.Page?.media || []}
        />
      </Box>
    </Box>
  );
};

export default SearchPage;
