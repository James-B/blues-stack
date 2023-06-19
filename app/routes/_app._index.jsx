import { useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function DashboardPage() {
  const data = useLoaderData();
  return (
    <div className="fles h-full">
      <p>Dashboard</p> <p>{data?.email}</p>
    </div>
  );
}
