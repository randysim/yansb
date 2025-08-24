import Navbar from "./components/navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/signin");
    }

    if (!session.user.setting) {
      redirect("/onboard")
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}