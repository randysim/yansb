import { redirect } from 'next/navigation'
import OnboardManager from './components/onboard-manager'
import { auth } from '@/auth'

export default async function OnboardPage() {
    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        redirect('/signin')
    }

    if (session.user.setting) {
        redirect('/dashboard')
    }

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <OnboardManager />
        </div>
    )
}
