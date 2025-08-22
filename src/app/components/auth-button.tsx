"use client"
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthButton({ className } : { className?: string }) {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <>
            {session ? (
                <Button className={className} onClick={() => signOut()}>Sign Out</Button>
            ) : (
                <Button className={className} onClick={() => router.push("/signin")}>Sign In</Button>
            )}
        </>
    );
}