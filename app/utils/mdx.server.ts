import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import path from "path";

const CONTENT_PATH = "content";

export const getMdxPage = async (contentPath: string) => {
  try {
    const content = await getMdxContent(contentPath);

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
 * @param contentPath the path to the content. For example:
 * posts/content_name
 */
const getMdxContent = async (contentPath: string): Promise<MDXContent> => {
  if (process.env["NODE_ENV"] === "production") {
    return getLocalMdxContent(contentPath);
  } else {
    //TODO: Replace with remote
    return getLocalMdxContent(contentPath);
    //return getRemoteMdxContent(contentPath);
  }
};

/**
 * Get content from the local filesystem (only used in development)
 */
const getLocalMdxContent = (contentPath: string): MDXContent => {
  //TODO: Handle directory or single file
  const fileSource = fs.readFileSync(
    path.join(process.cwd(), CONTENT_PATH, contentPath),
    "utf8"
  );

  // TODO: Implement files

  return {
    path: contentPath,
    source: fileSource,
    files: [],
  };
};

/**
 * Get content from the the github repo (only used in production)
 */
const getRemoteMdxContent = async (contentPath: MDXContent) => {
  // TODO: implement
  throw new Error("Not implemented");
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
