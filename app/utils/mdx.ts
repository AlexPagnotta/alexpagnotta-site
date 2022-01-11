import { bundleMDX } from "mdx-bundler";

// Function that compile a MDX file, source is the path of the file
export const compileMdx = async (source: string) => {
  try {
    const { code, frontmatter } = await bundleMDX({
      source: source,
      //files, Files to import
    });

    return {
      code,
      frontmatter,
    };
  } catch (error: unknown) {
    console.error(`Compilation error for file: `, source);
    throw error;
  }
};
