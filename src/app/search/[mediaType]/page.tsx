import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import { getClient } from "@/clients/anilist";
import AnimeCoverList from "@/components/AnimeCoverList";
import {
  GetGenreCollectionQuery,
  GetMediaPagesQuery,
  MediaSeason,
} from "@/generated/graphql";
import { GetMediaPages } from "@/graphql/GetMediaPages.graphql";
import QueryFilter from "@/components/QueryFilter";
import { GetGenreCollection } from "@/graphql/GetGenreCollection.graphql";

type SearchPagePropType = {
  params: { year: string; season: string };
  searchParams: Record<string, string | string[]>;
};

const SearchPage = async ({ params, searchParams }: SearchPagePropType) => {
  console.log(searchParams);
  const paramYear = searchParams.year?.toString() || "";
  const paramSeason = searchParams.season?.toString() || "";
  const paramSearch = searchParams.search?.toString() || "";
  const paramGenres = searchParams.genres || "";

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
  };

  const genreQuery = await getClient().query<GetGenreCollectionQuery>({
    query: GetGenreCollection,
  });

  const mediaQuery = await getClient().query<GetMediaPagesQuery>({
    query: GetMediaPages,
    variables: { ...defaultParams },
  });

  return (
    <>
      <QueryFilter genres={genreQuery.data.GenreCollection} />
      <AnimeCoverList list={mediaQuery.data.Page?.media} />
    </>
  );
};

export default SearchPage;
