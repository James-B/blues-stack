import { authenticator } from "~/utils/auth.server";

export async function action({ request }) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
