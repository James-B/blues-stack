import React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { clsx } from "clsx";
import { useTheme, ThemeSwitch } from "~/routes/resources+/theme";

export default function MainNavigation() {
  const theme = useTheme();

  return (
    <NavigationMenuPrimitive.Root className="relative justify-center">
      <NavigationMenuPrimitive.List className="flex flex-row bg-red-800 dark:bg-gray-800 p-2 space-x-2 justify-center">
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger
            className={clsx(
              "px-3 py-2 text-sm rounded-md hover:bg-red-900 dark:hover:bg-gray-900",
              "text-sm font-medium",
              "text-white dark:text-gray-100",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            Overview
          </NavigationMenuPrimitive.Trigger>

          <NavigationMenuPrimitive.Content
            className={clsx(
              "absolute w-auto top-0 left-0 rounded-lg",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[21rem] lg:w-[23rem] p-3">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2 w-full bg-red-900 dark:bg-gray-900 p-4 rounded-md"></div>

                <div className="col-span-4 w-full flex flex-col space-y-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
                  <div className="w-full bg-red-700 dark:bg-gray-700 h-12 rounded-md"></div>
                  <div className="w-full bg-red-700 dark:bg-gray-700 h-12 rounded-md"></div>
                  <div className="w-full bg-red-700 dark:bg-gray-700 h-12 rounded-md"></div>
                  <div className="w-full bg-red-700 dark:bg-gray-700 h-12 rounded-md"></div>
                </div>
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger
            className={clsx(
              "px-3 py-2 text-sm rounded-md hover:bg-red-900 dark:hover:bg-gray-900",
              "text-sm font-medium text-white dark:text-gray-100",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            Resources
          </NavigationMenuPrimitive.Trigger>

          <NavigationMenuPrimitive.Content
            className={clsx(
              "absolute w-auto top-0 left-0 rounded-lg",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[16rem] lg:w-[18rem] p-3">
              <div className="w-full flex flex-col space-y-2">
                <NavigationMenuPrimitive.Link
                  className={clsx(
                    "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  href="https://tailwindcss.com"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Tailwind CSS
                  </span>

                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    A utility-first CSS framework for rapidly building custom
                    user interfaces.
                  </div>
                </NavigationMenuPrimitive.Link>

                <NavigationMenuPrimitive.Link
                  className={clsx(
                    "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  href="https://www.radix-ui.com"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Radix UI
                  </span>

                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    An open-source UI component library for building
                    high-quality, accessible design systems and web apps.
                  </div>
                </NavigationMenuPrimitive.Link>
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="https://github.com/ecklf/tailwindcss-radix"
            className={clsx(
              "px-3 py-2 text-sm rounded-md hover:bg-red-900 dark:hover:bg-gray-900",
              "text-sm font-medium text-white dark:text-gray-100"
            )}
          >
            GitHub
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item asChild>
          <ThemeSwitch userPreference={theme} />
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Indicator
          className={clsx(
            "z-10",
            "top-[100%] flex items-end justify-center h-2 overflow-hidden",
            "radix-state-visible:animate-fade-in",
            "radix-state-hidden:animate-fade-out",
            "transition-[width_transform] duration-[250ms] ease-[ease]"
          )}
        >
          <div className="top-1 relative bg-red-800 dark:bg-gray-800 w-2 h-2 rotate-45" />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <div
        className={clsx(
          "absolute flex justify-center",
          "w-[140%] left-[-20%] top-[100%]"
        )}
        style={{
          perspective: "2000px",
        }}
      >
        <NavigationMenuPrimitive.Viewport
          className={clsx(
            "relative mt-2 shadow-lg rounded-md bg-red-800 dark:bg-gray-800 overflow-hidden",
            "w-radix-navigation-menu-viewport",
            "h-radix-navigation-menu-viewport",
            "radix-state-open:animate-scale-in-content",
            "radix-state-closed:animate-scale-out-content",
            "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
}

/*
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Form, NavLink } from "@remix-run/react";
import { Link } from "@remix-run/react/dist/components";

export default function MainNavigation() {


  return (
      <NavigationMenu.Root className="flex items-center justify-between w-full">
        <NavigationMenu.List className="flex">test</NavigationMenu.List>
      </NavigationMenu.Root>
  );
}

/*
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
              <div className="flex-grow" />
            </li>
            <li>
              <div className="p-4">
                <ThemeSwitch userPreference={theme} />
              </div>
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

*/
