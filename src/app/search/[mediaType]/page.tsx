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
  searchParams: ReadonlyURLSearchParams;
};

const SearchPage = async ({ params, searchParams }: SearchPagePropType) => {
  const getSeason = (d: Date) => Math.floor((d.getMonth() / 12) * 4) % 4;
  const date = new Date();
  const seasonYear = date.getFullYear().toString();
  const season = [
    MediaSeason.Winter,
    MediaSeason.Spring,
    MediaSeason.Summer,
    MediaSeason.Fall,
  ][getSeason(new Date())];

  const defaultParams = {
    year: parseInt(seasonYear),
    season: season,
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
