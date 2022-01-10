const [changedFiles] = process.argv.slice(2);

const run = async () => {
  //Get changed files paths from args
  const changedFilesPaths = changedFiles?.split(",") || [];

  // Filter changed files not from content, even if there shouldn't be
  const changedContentFiles = changedFilesPaths.filter((file) =>
    file.startsWith("content")
  );

  if (changedContentFiles.length) {
    const changedFilesName = changedContentFiles.map((file) =>
      file.replace(/^content\//, "")
    );
    console.log(changedFilesName);
  } else {
    // Files are checked on GH action, so there should always be changed files if this script is executed
    console.log(
      'No changed files found, this should not happen, check the "refresh-content" GH action!'
    );
  }
};

run();
