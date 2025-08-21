import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
 
type SignInPageProps = {
    searchParams: {
        callbackUrl?: string
    }
}

const SIGNIN_ERROR_URL = "/error"
 
export default async function SignInPage(
    {
        searchParams
    }: SignInPageProps
) {
    const session = await auth();
    const { callbackUrl } = await searchParams;

    if (session) {
        redirect(callbackUrl ?? "/dashboard");
    }

    return (
        <div className="flex flex-col gap-2">
            {Object.values(providerMap).map((provider) => (
                <form
                key={provider.id}
                action={async () => {
                    "use server"
                    try {
                    await signIn(provider.id, {
                        redirectTo: callbackUrl ?? "/dashboard",
                    })
                    } catch (error) {
                    if (error instanceof AuthError) {
                        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                    }

                    throw error
                    }
                }}
                >
                <button type="submit">
                    <span>Sign in with {provider.name}</span>
                </button>
                </form>
            ))}
        </div>
    )
}