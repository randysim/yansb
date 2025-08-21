import { redirect } from "next/navigation";

export default async function OnboardPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/settings`);
    const data = await res.json();

    if (data.settings) {
    redirect("/dashboard")
    }

    return (
        <div>
            <h1>Onboard</h1>
        </div>
    )
}