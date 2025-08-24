'use client'

import { useSession } from 'next-auth/react'
import { JSX, useState } from 'react'
import { User, Shield, Bell, Palette, CreditCard } from 'lucide-react'

/* Setting Sections */
import ProfileSection from './profile-section'
import SecuritySection from './security-section'
import NotificationsSection from './notifications-section'
import AppearanceSection from './appearance-section'
import BillingSection from './billing-section'

export default function Settings() {
    const { data: session } = useSession()
    const [activeSection, setActiveSection] = useState('profile')

    const settings: { [key: string]: { label: string; icon: JSX.Element; component: JSX.Element } } = {
        profile: {
            label: 'Profile',
            icon: <User className="w-5 h-5" />,
            component: <ProfileSection session={session!} />,
        },
        security: {
            label: 'Security',
            icon: <Shield className="w-5 h-5" />,
            component: <SecuritySection />,
        },
        notifications: {
            label: 'Notifications',
            icon: <Bell className="w-5 h-5" />,
            component: <NotificationsSection />,
        },
        appearance: {
            label: 'Appearance',
            icon: <Palette className="w-5 h-5" />,
            component: <AppearanceSection />,
        },
        billing: {
            label: 'Billing',
            icon: <CreditCard className="w-5 h-5" />,
            component: <BillingSection session={session!} />,
        },
    }

    // Only render all sections on mobile (below lg), desktop uses sidebar for navigation
    return (
        <div className="relative h-full">
            {/* Desktop Layout (sidebar nav, only one section shown) */}
            <div className="hidden lg:flex h-full">
                <div className="w-64 border-r bg-muted/10 shrink-0">
                    <div className="p-4">
                        <h1 className="text-lg font-semibold mb-4">Settings</h1>
                        <ul className="space-y-1">
                            {Object.entries(settings).map(([id, { label, icon }]) => (
                                <li key={id}>
                                    <button
                                        onClick={() => setActiveSection(id)}
                                        className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left font-medium transition-colors ${
                                            activeSection === id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        {icon}
                                        <span>{label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    <div className="p-6">{settings[activeSection]?.component}</div>
                </div>
            </div>
            {/* Mobile Layout (all sections stacked) */}
            <div className="lg:hidden flex flex-col h-full overflow-auto">
                <h1 className="text-lg font-semibold p-4 border-b">Settings</h1>
                <div className="p-4">
                    {Object.entries(settings).map(([id, { component }]) => (
                        <div key={id} className="mb-8">
                            {component}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
