export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withSiteBasePath(path: string) {
  return path.startsWith("/") ? `${siteBasePath}${path}` : path;
}
