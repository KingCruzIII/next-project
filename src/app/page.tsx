import { get, getClient } from "@/clients/anilist";
import AnimeCoverList from "@/components/AnimeCoverList";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

export const revalidate = 3600;

const Home = async () => {
  // return redirect(`/seasons`);
  const seasonYear = "2024";
  const season = "SPRING";

  const query = gql`
    query ($season: MediaSeason, $seasonYear: Int) {
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
  `;

  const variables = { seasonYear, season };

  const { data } = await getClient().query({ query, variables });

  const itemData = data["Page"]["media"];
  return <AnimeCoverList list={itemData} />;
};

export default Home;
