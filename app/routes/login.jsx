import React from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { sessionStorage } from "../utils/session.server";
import { authenticator, signup } from "../utils/auth.server";

export async function action({ context, request }) {
  const formData = await request.formData();
  const action = formData.get("_action");

  try {
    if (action === "register") {
      await signup(formData);
    }
  } catch (error) {
    return error;
  }

  return await authenticator.authenticate("form", request, {
    //successRedirect: formData.get("redirectTo"),
    successRedirect: "/",
    throwOnError: true,
    failureRedirect: "/login",
    context: { formData },
  });
}

/**
 * get the cookie and see if there are any errors that were
 * generated when attempting to login
 *
 */
export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const error = session.get("sessionErrorKey");
  return json({ error });
}

export default function Login() {
  const [action, setAction] = React.useState("login");

  // if i got an error it will come back with the loader data
  const loaderData = useLoaderData();

  return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
      <button
        onClick={() => setAction(action == "login" ? "register" : "login")}
        className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        {action === "login" ? "Sign Up" : "Sign In"}
      </button>

      <p className="font-semibold text-slate-300">
        {action === "login" ? "Log In!" : "Sign Up To Get Started!"}
      </p>
      <Form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
        <label htmlFor="Email" className="text-blue-600 font-semibold">
          Email
        </label>

        <input
          type="text"
          id="email"
          name="email"
          className="w-full p-2 rounded-xl my-2 text-black"
        />

        <label htmlFor="password" className="text-blue-600 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 rounded-xl my-2 text-black"
        />

        <div className="w-full text-center">
          <button
            type="submit"
            name="_action"
            value={action}
            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            {action === "login" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </Form>
      <div>
        {loaderData?.error ? <p>ERROR: {loaderData?.error?.message}</p> : null}
      </div>
    </div>
  );
}
