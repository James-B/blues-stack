import { Outlet } from "@remix-run/react";
import MainNavigation from "~/components/MainNavigation";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

export async function action({ request }) {
  await authenticator.logout(request, { redirectTo: "/login" });
}

export default function AppLayout() {
  return (
    <div className="flex flex-col h-full">
      <header>
        <MainNavigation />
      </header>
      <Outlet />
    </div>
  );
}
