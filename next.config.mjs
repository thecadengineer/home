/** @type {import('next').NextConfig} */

// If you deploy to a project page (https://<user>.github.io/<repo>/),
// GitHub Pages serves the site from a subpath equal to the repo name.
// Set REPO_NAME below to match your repository, or leave it blank if
// you're deploying to a user/org page (https://<user>.github.io/).
const REPO_NAME = "datum-cad";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export", // produces a static ./out directory `next build`
  trailingSlash: true, // avoids 404s on GitHub Pages for nested routes
  images: {
    unoptimized: true, // GitHub Pages has no image optimization server
  },
  basePath: isGithubPages && REPO_NAME ? `/${REPO_NAME}` : "",
  assetPrefix: isGithubPages && REPO_NAME ? `/${REPO_NAME}/` : "",
};

export default nextConfig;
