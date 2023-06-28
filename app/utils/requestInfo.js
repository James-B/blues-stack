import { useRouteLoaderData } from "@remix-run/react";

/**
 * @returns the request info from the root loader
 */
export function useRequestInfo() {
  const data = useRouteLoaderData("root");
  return data.requestInfo;
}
