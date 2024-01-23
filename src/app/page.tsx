import { getClient } from "@/clients/anilist";
import { Box, Typography } from "@mui/material";
import AnimeCoverList from "@/components/AnimeCoverList";
import { GetFrontPage } from "@/graphql/GetFrontPage.graphql";
import { GetFrontPageQuery, MediaSeason } from "@/generated/graphql";
export const revalidate = 3600;

const Home = async () => {
  const getSeason = (d: Date) => Math.floor((d.getMonth() / 12) * 4) % 4;
  const date = new Date();
  const defaultSeasonYear = date.getFullYear().toString();
  const seasons = [
    MediaSeason.Winter,
    MediaSeason.Spring,
    MediaSeason.Summer,
    MediaSeason.Fall,
  ];
  const defaultSeason = seasons[getSeason(new Date())];

  const defaultParams = {
    type: "ANIME",
    season: defaultSeason,
    seasonYear: defaultSeasonYear,
    nextSeason: seasons[getSeason(new Date()) + 1],
    nextYear: defaultSeasonYear,
  };

  const mediaQuery = await getClient().query<GetFrontPageQuery>({
    query: GetFrontPage,
    variables: { ...defaultParams },
  });
  console.log(mediaQuery);

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="1rem 0 0 0"
      margin="0 auto"
    >
      <Typography>Trending Now</Typography>
      <Box display="flex">
        <AnimeCoverList size="small" list={mediaQuery.data.trending?.media} />
      </Box>
      <Typography>Upcoming Next Season</Typography>
      <Box display="flex">
        <AnimeCoverList size="small" list={mediaQuery.data.nextSeason?.media} />
      </Box>
      <Typography>Popular This Season</Typography>
      <Box display="flex">
        <AnimeCoverList size="small" list={mediaQuery.data.season?.media} />
      </Box>
      <Typography>All Time Popular</Typography>
      <Box display="flex">
        <AnimeCoverList size="small" list={mediaQuery.data.popular?.media} />
      </Box>
      {/* <Typography>Top 100</Typography>
      <AnimeCoverList size="small" list={mediaQuery.data.top?.media} /> */}
    </Box>
  );
};

export default Home;
