import React from "react";
import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { useFetcher } from "@remix-run/react";
import { safeRedirect } from "remix-utils";
import { z } from "zod";
import { useRequestInfo } from "~/utils/requestInfo";
import { json, redirect } from "@remix-run/node";
import { commitSession, getSession, setTheme } from "./theme-session.server";

const ROUTE_PATH = "/resources/theme";

const ThemeFormSchema = z.object({
  redirectTo: z.string().optional(),
  theme: z.enum(["light", "dark"]),
});

export async function action({ request }) {
  console.log("call action");
  const formData = await request.formData();
  const submission = parse(formData, {
    schema: ThemeFormSchema,
    acceptMultipleErrors: () => true,
  });

  if (!submission.value) {
    return json(
      {
        status: "error",
        submission,
      },
      { status: 400 }
    );
  }

  if (submission.intent !== "submit") {
    return json({ status: "success", submission });
  }

  const session = await getSession(request.headers.get("cookie"));
  const { redirectTo, theme } = submission.value;
  setTheme(session, theme);

  const responseInit = {
    headers: { "Set-Cookie": await commitSession(session) },
  };
  if (redirectTo) {
    return redirect(safeRedirect(redirectTo), responseInit);
  } else {
    return json({ success: true }, responseInit);
  }
}

export function ThemeSwitch({ userPreference }) {
  const requestInfo = useRequestInfo();
  const fetcher = useFetcher();
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema });
    },
  });

  const mode = userPreference ?? "dark";
  const nextMode = mode === "light" ? "dark" : "light";
  const modeLabel = {
    light: (
      <>
        🔆 <span className="sr-only">Light</span>
      </>
    ),
    dark: (
      <>
        🌕 <span className="sr-only">Dark</span>
      </>
    ),
  };

  return (
    <fetcher.Form method="POST" action={ROUTE_PATH} {...form.props}>
      <div className="flex gap-2">
        {/*
					this is for progressive enhancement so we redirect them to the page
					they are on if the JavaScript hasn't had a chance to hydrate yet.
				*/}
        {isHydrated ? null : (
          <input type="hidden" name="redirectTo" value={requestInfo.path} />
        )}
        <input type="hidden" name="theme" value={nextMode} />
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center">
          {modeLabel[mode]}
        </button>
      </div>
      {/*
      <ErrorList errors={form.errors} id={form.errorId} />
      */}
    </fetcher.Form>
  );
}

/**
 * @returns the user's theme preference, or the dark theme
 */
export function useTheme() {
  const requestInfo = useRequestInfo();
  return requestInfo.session.theme ?? "dark";
}
