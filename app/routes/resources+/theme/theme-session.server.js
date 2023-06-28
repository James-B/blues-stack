import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

const themeKey = "theme";

export async function getTheme(request) {
  const session = await getSession(request.headers.get("Cookie"));
  const theme = session.get(themeKey);
  if (theme === "dark" || theme === "light") return theme;
  return null;
}

export function setTheme(session, theme) {
  session.set(themeKey, theme);
}

export function deleteTheme(session) {
  session.unset(themeKey);
}
