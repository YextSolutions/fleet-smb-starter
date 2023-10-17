import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

const getPosts = async (
  request: SitesHttpRequest
): Promise<SitesHttpResponse> => {
  const { method, pathParams } = request;

  const { id } = pathParams;

  if (method !== "GET") {
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }

  if (!id) {
    return { body: "Missing entityId", headers: {}, statusCode: 400 };
  }

  const postsApiResp = await fetch(
    `https://api.yextapis.com/v2/accounts/me/posts?api_key=${YEXT_PUBLIC_YEXT_API_KEY}&v=20231016`
  );

  const resp = await postsApiResp.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getPosts;
