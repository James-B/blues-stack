import { createCookieSessionStorage } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    secure: process.env.NODE_ENV === "production", // enable this in prod only
    secrets: [SESSION_SECRET], // replace this with an actual secret
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true, // for security reasons, make this cookie http only
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;
