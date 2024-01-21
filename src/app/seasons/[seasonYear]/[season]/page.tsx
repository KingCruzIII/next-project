import { redirect } from "next/navigation";
import { getClient } from "@/clients/anilist";
import AnimeCoverList from "@/components/AnimeCoverList";
import { GetMediaPagesQuery } from "@/generated/graphql";
import { GetMediaPages } from "@/graphql/GetMediaPages.graphql";
type SeasonPropType = {
  params: { seasonYear: string; season: string };
};

const Season = async ({ params }: SeasonPropType) => {
  const seasonYear = params.seasonYear || "";
  let season = params.season?.toUpperCase() || "";
  if (!["winter", "spring", "summer", "fall"].includes(params.season))
    return redirect(`/seasons`);
  const type = "ANIME";
  const variables = { seasonYear, season, type };
  const { data } = await getClient().query<GetMediaPagesQuery>({
    query: GetMediaPages,
    variables,
  });
  const page = data.Page;
  let media = page?.media;

  return <AnimeCoverList list={media} />;
};

export default Season;
