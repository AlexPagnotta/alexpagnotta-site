import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import path from "path";
const { readFile } = fs.promises;

const CONTENT_PATH = "content";

export const getMdxPage = async (contentPath: string) => {
  try {
    const content = await getMdxContent(contentPath);

    //TODO Handle better?
    if (!content) return;

    const compiledContent = await compileMdx(content);

    console.log(compiledContent);
  } catch (error) {
    console.error(`Failed to get the mdx page for the content: ${contentPath}`);
    throw error;
  }
};

type MDXContent = {
  // Main .mdx file
  path: string;
  source: string;

  // Imported files
  files: {
    path: string;
    source: string;
  }[];
};

/**
 * Get content from the mdx file, and imported files
 * @param contentPath the path to the content, could be a mdx file or a directory,  For example:
 * posts/content_name //Directory
 * posts/content_name.mdx //File
 */
const getMdxContent = async (
  contentPath: string
): Promise<MDXContent | null> => {
  throw new Error("TODO: To implement!");
  return null;
};

/**
 * Compiles an mdx file and his imported files
 * @param content the mdx data, includes main file source and his imported files
 */
const compileMdx = async (content: MDXContent) => {
  try {
    const { code, frontmatter } = await bundleMDX({
      source: content.source,
      //files, Files to import
    });

    console.log(code);
    console.log(frontmatter);

    return {
      code,
      frontmatter,
    };
  } catch (error: unknown) {
    console.error(`Compilation error for file: `, content.path);
    throw error;
  }
};

//N.B Old code for local files, now it's handled trough MSW
// /**
//  * Get content from the local filesystem (only used in development)
//  */
// const getLocalMdxContent = async (
//   contentPath: string
// ): Promise<MDXContent | null> => {
//   const mdxFileOrDirectory = path.join(
//     process.cwd(),
//     CONTENT_PATH,
//     contentPath
//   );

//   // Get content parent folder, this also indicates the mdx type
//   const parentDir = path.dirname(mdxFileOrDirectory);

//   // Get all contents in parent folder
//   const dirFiles = fs.readdirSync(parentDir, { withFileTypes: true });

//   // Get mdx "slug"
//   const basename = path.basename(mdxFileOrDirectory);

//   // Get all files or directories that matches with basename
//   const matches = dirFiles.filter(({ name }) => name.startsWith(basename));

//   // First search for a file
//   const fileMatch = matches.find(({ name }) => name === `${basename}.mdx`);

//   if (fileMatch) {
//     const fileSource = fs.readFileSync(
//       path.join(process.cwd(), CONTENT_PATH, `${contentPath}.mdx`),
//       "utf8"
//     );

//     return {
//       path: contentPath,
//       source: fileSource,
//       files: [],
//     };
//   }

//   // Search for folder
//   const folderMatch = matches.find(
//     ({ name, isDirectory }) => name === basename && isDirectory
//   );

//   if (folderMatch) {
//     console.log("FOLDER MATCH");

//     // Get all files in folder
//     const mdxDirFiles = fs.readdirSync(mdxFileOrDirectory);

//     //Get main mdx file
//     const mdxFile = mdxDirFiles.find(
//       (file) => path.extname(file).toLowerCase() === ".mdx"
//     );

//     if (!mdxFile) {
//       throw Error("TODO");
//     }

//     //Get Tsx files for imports
//     const tsxFiles = mdxDirFiles.filter(
//       (file) => path.extname(file).toLowerCase() === ".tsx"
//     );

//     console.log(tsxFiles);
//     console.log(mdxFile);

//     const mdxFileSource = fs.readFileSync(
//       path.join(mdxFileOrDirectory, mdxFile),
//       "utf-8"
//     );

//     const tsxFilesSource: MDXContent["files"] = [];

//     await Promise.all(
//       mdxDirFiles.map(async (file) => {
//         const source = await readFile(
//           path.join(mdxFileOrDirectory, file),
//           "utf-8"
//         );
//         tsxFilesSource.push({
//           path: file,
//           source,
//         });
//       })
//     );

//     return {
//       path: contentPath,
//       source: mdxFileSource,
//       files: tsxFilesSource,
//     };
//   }

//   return null;
// };

// /**
//  * Get content from the the github repo (only used in production)
//  */
// const getRemoteMdxContent = async (contentPath: string) => {
//   // TODO: implement
//   throw new Error("Not implemented");
// };
