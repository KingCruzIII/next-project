import { get } from "@/clients/anilist";
// import AnimeCoverList from "@/components/AnimeCoverList";
import { redirect } from "next/navigation";

const Home = async () => {
  return redirect(`/seasons`);
  // const seasonYear = "2024";
  // const season = "SPRING";

  // const requestBody = {
  //   query: `
  //     query($season: MediaSeason, $seasonYear: Int) {
  //       Page {
  //         media(season: $season, seasonYear: $seasonYear) {
  //           title {
  //             english
  //             native
  //           }
  //           description
  //           id
  //           coverImage {
  //             large
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   variables: { seasonYear, season },
  // };

  // const response = await get(requestBody);

  // const itemData = response.data["Page"]["media"];
  // return <div />;
  // return <AnimeCoverList list={itemData} />;
};

export default Home;
