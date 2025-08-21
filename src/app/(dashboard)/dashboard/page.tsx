import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/settings`);
  const data = await res.json();

  if (!data.settings) {
    redirect("/onboard")
  }

  return (
    <div>
      
    </div>
  );
}
