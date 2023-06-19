import { Form, NavLink, useLoaderData } from "@remix-run/react";

export default function MainNavigation() {
  const data = useLoaderData();

  return (
    <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-gray-900">
      <div
        className="hidden w-full md:flex md:items-center md:w-auto "
        id="menu"
      >
        <ul className="text-base text-white pt-4 md:flex md:justify-between md:pt-0">
          <li>
            <NavLink
              className="md:p-4 py-2 block hover:text-purple-400 aria-[current=page]:text-blue-400"
              to="/"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <Form
              className="flex h-full"
              method="post"
              action="/logout"
              id="logout-form"
            >
              <button>Log Out</button>
            </Form>
          </li>
        </ul>
      </div>
    </nav>
  );
}
