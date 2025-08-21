import Navbar from "./components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    console.log(session)

    if (!session) {
        redirect("/signin");
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}