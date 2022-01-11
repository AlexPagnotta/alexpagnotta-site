import { ActionFunction, json, redirect } from "remix";

type Body = {
  contentPaths: string[]; //Files to refresh, path should be in the format posts/fileName
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response(`Invalid method ${request.method}`, {
      status: 405,
    });
  }

  const body = (await request.json()) as Body;

  if ("contentPaths" in body && Array.isArray(body.contentPaths)) {
    for (const contentPath of body.contentPaths) {
      if (typeof contentPath !== "string") continue;

      //Handle blog posts
      if (contentPath.startsWith("posts")) {
        console.log(contentPath);
      }
    }

    return json({ message: "Content refreshed succesfully" }, { status: 200 });
  }

  return json({ message: "No action taken" }, { status: 400 });
};

// Handle GET
export const loader = () => redirect("/", { status: 404 });
