import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { syncStripeData } from '@/stripe'
import Link from 'next/link'
import { Suspense } from 'react'

export default function SuccessPage() {
    return (
        <div className="w-full py-24">
            <Suspense
                fallback={
                    <div className="w-full flex justify-center">
                        <Spinner variant="circle" size={64} />
                    </div>
                }
            >
                <VerifySuccess />
            </Suspense>
        </div>
    )
}

async function VerifySuccess() {
    const session = await auth()

    const subscription = await syncStripeData(session?.user.setting?.customerId!)

    const renderMessage = () => {
        if (!subscription) {
            return (
                <div>
                    <h1 className="text-4xl font-semibold text-center">Error</h1>
                    <p className="mt-4 text-lg text-center">Your payment was not successful.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="text-4xl font-semibold text-center">Success</h1>
                    <p className="mt-4 text-lg text-center">Your payment was successful.</p>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col items-center">
            {renderMessage()}
            <div>
                <Link href="/dashboard">
                    <Button className="mt-4">Go To Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}
