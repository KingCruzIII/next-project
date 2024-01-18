import { get } from "@/clients/anilist";
import AnimeCoverList from "@/components/AnimeCoverList";
import { redirect } from "next/navigation";

type SeasonPropType = {
  params: { seasonYear: string; season: string };
};

const Season = async ({ params }: SeasonPropType) => {
  const seasonYear = params.seasonYear || "";
  const season = params.season?.toUpperCase() || "";
  // if (!["winter", "spring", "summer", "fall"].includes(params.season))
  //   return redirect(`/seasons`);
  const requestBody = {
    query: `
      query($season: MediaSeason, $seasonYear: Int) {
        Page {
          media(season: $season, seasonYear: $seasonYear) {
            title {
              english
              native
            }
            description
            id
            coverImage {
              large
            }
          }
        }
      }
    `,
    variables: { seasonYear, season },
  };

  const response = await get(requestBody || {});

  const itemData = response?.data?.Page?.media;
  return <div />;
  // return <AnimeCoverList list={itemData} />;
};

export default Season;
