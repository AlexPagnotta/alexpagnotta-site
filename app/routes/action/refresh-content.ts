import { ActionFunction, json, redirect } from "remix";
import { getMdxPage } from "~/utils/mdx.server";

type Body = {
  contentPaths: string[]; //Files to refresh, path should be in the format posts/fileName
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(`Invalid method ${request.method}`, {
      status: 405,
    });
  }

  // Check if the correct token has been passed,
  // this way we are sure is the github action that is calling us
  if (
    request.headers.get("auth") !== process.env["REFRESH_CONTENT_AUTH_TOKEN"]
  ) {
    return new Response(`Ehy! What are you doing!`, {
      status: 401,
    });
  }

  const body = (await request.json()) as Body;

  const refreshedPaths = [];

  if (
    "contentPaths" in body &&
    Array.isArray(body.contentPaths) &&
    body.contentPaths.length !== 0
  ) {
    for (const contentPath of body.contentPaths) {
      if (typeof contentPath !== "string") continue;

      //Handle blog posts
      if (contentPath.startsWith("posts")) {
        refreshedPaths.push(contentPath);

        void getMdxPage(contentPath);
      }

      //Other content in the future
    }

    return json(
      {
        message: "Content refreshed succesfully",
        refreshedPaths,
      },
      { status: 200 }
    );
  }

  return json({ message: "No action taken" }, { status: 400 });
};

// Handle GET
export const loader = () => redirect("/", { status: 404 });
