//Installed by Remix
const fetch = require("node-fetch");

const [changedFiles] = process.argv.slice(2);

const refreshContent = async (contentFiles) => {
  try {
    const res = await fetch(`http://localhost:3000/action/refresh-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentPaths: contentFiles,
      }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return `Error on content refresh action call: ${error.message}`;
  }
};

const run = async () => {
  //Get changed files paths from args
  const changedFilesPaths = changedFiles?.split(",") || [];

  // Filter changed files not from content, even if there shouldn't be
  const changedContentFiles = changedFilesPaths
    .filter((file) => file.startsWith("content"))
    .map((file) => file.replace(/^content\//, ""));

  if (changedContentFiles.length) {
    const response = await refreshContent(changedContentFiles);

    console.log(`Content refreshed!.`, { response });
  } else {
    // Files are checked on GH action, so there should always be changed files if this script is executed
    console.log(
      'No changed files found, this should not happen, check the "refresh-content" GH action!'
    );
  }
};

run();
