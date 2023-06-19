// import { ActionFunction, Form, useLoaderData } from "remix";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

export async function action({ request }) {
  await authenticator.logout(request, { redirectTo: "/login" });
}

export default function DashboardPage() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Protected Dashboard</h1>
      <p>{data?.email}</p>
      <Form method="post">
        <button>Log Out</button>
      </Form>
    </div>
  );
}
