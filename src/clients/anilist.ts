type QueryBody = {
  query: string;
  variables: Record<string, string>;
};

export const get = async (queryBody: QueryBody) => {
  const headers = {
    "content-type": "application/json",
  };
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(queryBody),
  };
  const response = await (
    await fetch("https://graphql.anilist.co", options)
  ).json();
  return response;
};
