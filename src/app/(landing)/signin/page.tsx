import { redirect } from 'next/navigation'
import { signIn, auth, providerMap } from '@/auth'
import { AuthError } from 'next-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'

type SignInPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const SIGNIN_ERROR_URL = '/error'

export default async function SignInPage(props: SignInPageProps) {
    const session = await auth()
    const searchParams = await props.searchParams

    const callbackUrl = Array.isArray(searchParams.callbackurl)
        ? searchParams.callbackurl[0]
        : searchParams.callbackurl

    if (session) {
        redirect(callbackUrl ?? '/dashboard')
    }

    console.log("CALLBACKURL: " + callbackUrl)

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-2xl mx-4">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Sign in to continue to your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <div className="mb-2 tracking-wide">Continue with</div>
                    {Object.values(providerMap).map((provider) => (
                        <form
                            key={provider.id}
                            action={async () => {
                                'use server'
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: callbackUrl ?? '/dashboard',
                                    })
                                } catch (error) {
                                    if (error instanceof AuthError) {
                                        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                                    }

                                    throw error
                                }
                            }}
                        >
                            <Button type="submit" className="w-sm">
                                <span>{provider.name}</span>
                            </Button>
                        </form>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
