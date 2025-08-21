"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButton({ className } : { className?: string }) {
    const { data: session } = useSession();

    return (
        <>
            {session ? (
                <Button className={className} onClick={() => signOut()}>Sign Out</Button>
            ) : (
                <Button className={className} onClick={() => signIn()}>Sign In</Button>
            )}
        </>
    );
}