import { getClient } from "@/clients/anilist";
import YouTubePlayer from "@/components/YouTubePlayer";
import { Chip, Divider, Paper, Typography } from "@mui/material/index";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import Image from "next/image";
import { GetMedia } from "@/graphql/GetMedia.graphql";
import { GetMediaQuery } from "@/generated/graphql";

// xl = 460x652
// l = 230x326
// m = 100x142

const animeId = async ({ params }: { params: { animeId: string } }) => {
  const mediaId = params.animeId || "";

  // const x: Record<string, string> = { thing: "other", potato: "butter" };

  const variables = { mediaId };

  const { data } = await getClient().query<GetMediaQuery>({
    query: GetMedia,
    variables,
  });

  const item = data.Media;
  const itemTitle = item?.title?.english || item?.title?.native || "";
  const coverSize = item?.coverImage?.extraLarge || "";

  return (
    <Grid justifyContent="center" padding="1rem" container spacing={2}>
      <Grid lg="auto" display="flex" justifyContent="center" md={12}>
        <Image width={460} height={652} src={coverSize} alt={itemTitle} />
      </Grid>
      <Grid lg md>
        <Paper>
          <Box
            alignItems="center"
            padding="1rem"
            display="flex"
            flexDirection="column"
          >
            <Typography padding={"0 0 .5rem 0"} variant="h3">
              {itemTitle}
            </Typography>
            <Divider variant="middle" flexItem />
            <Box padding=".5rem 0" display="flex" alignItems="center">
              <Box
                padding="0 1rem 0 0"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography>Score</Typography>
                <Typography>
                  {item?.averageScore ? item?.averageScore : "Not Yet Scored"}
                </Typography>
              </Box>
              <Divider variant="middle" orientation="vertical" flexItem />
              <Box
                padding="0 1rem 0 1rem"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography>Popularity</Typography>
                <Typography>#{item?.popularity}</Typography>
              </Box>
              <Divider variant="middle" orientation="vertical" flexItem />
              <Box display="flex" alignContent="center">
                <Typography padding="0 1rem 0 1rem">{`${item?.season} ${item?.seasonYear}`}</Typography>
              </Box>
            </Box>
            <Divider variant="middle" flexItem />
            <Typography padding=".5rem 0">Genres</Typography>
            <Box>
              {item?.genres?.map((genre: string | null | undefined) => {
                return <Chip key={"genre-" + genre} label={genre} />;
              })}
            </Box>
          </Box>
        </Paper>
        <Typography padding=".5rem 0" variant="h5">
          Synopsis
        </Typography>
        <Divider flexItem />
        <Typography padding=".5rem 0" variant="body2" color="text.secondary">
          {item?.description?.replaceAll(/(<i>|<br>|<\/i>|<\/br>)/g, "")}
        </Typography>
        <Divider flexItem />

        {item?.trailer?.id ? (
          <Box
            padding="1rem 0 0 0"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <YouTubePlayer videoId={item?.trailer?.id} />
          </Box>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default animeId;
