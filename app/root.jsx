import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import stylesheet from "~/styles/tailwind.css";
import { useTheme, ThemeSwitch } from "~/routes/resources+/theme";
import { getTheme } from "~/routes/resources+/theme/theme-session.server";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }) {
  return json({
    requestInfo: {
      session: {
        theme: await getTheme(request),
      },
    },
  });
}

export default function App() {
  const theme = useTheme();

  return (
    <html lang="en" className={`${theme} h-full`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col justify-between bg-background text-foreground">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
