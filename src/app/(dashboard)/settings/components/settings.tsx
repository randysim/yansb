"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import PricingBottomSheet from "../../components/pricing-bottom-sheet"

// Section Components
function ProfileSection({ session }: { session: any }) {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{session?.user?.name || "User"}</h3>
            <p className="text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Display Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue={session?.user?.name || ""} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue={session?.user?.email || ""} />
          </div>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

function SecuritySection() {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Password</h3>
            <p className="text-muted-foreground mb-3">Change your account password</p>
            <Button>Change Password</Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded" />
              <label className="text-sm">Enable two-factor authentication</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationsSection() {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AppearanceSection() {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Appearance Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Theme</h3>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <h3 className="font-medium mb-2">Language</h3>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function BillingSection() {
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Billing Settings</h2>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Current Plan</h3>
            <p className="text-muted-foreground">Free Plan</p>
          </div>
          <div className="flex space-x-2">
            <PricingBottomSheet>Upgrade Plan</PricingBottomSheet>
            <Button variant="outline">View Usage</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Desktop Sidebar Items
const navItems = [
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="w-5 h-5" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="w-5 h-5" /> },
]

export default function Settings() {
  const { data: session } = useSession()
  const [activeSection, setActiveSection] = useState("profile")

  // Only render all sections on mobile (below lg), desktop uses sidebar for navigation
  return (
    <div className="relative h-full">
      {/* Desktop Layout (sidebar nav, only one section shown) */}
      <div className="hidden lg:flex h-full">
        <div className="w-64 border-r bg-muted/10 shrink-0">
          <div className="p-4">
            <h1 className="text-lg font-semibold mb-4">Settings</h1>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {activeSection === "profile" && <ProfileSection session={session} />}
            {activeSection === "security" && <SecuritySection />}
            {activeSection === "notifications" && <NotificationsSection />}
            {activeSection === "appearance" && <AppearanceSection />}
            {activeSection === "billing" && <BillingSection />}
          </div>
        </div>
      </div>
      {/* Mobile Layout (all sections stacked) */}
      <div className="lg:hidden flex flex-col h-full overflow-auto">
        <h1 className="text-lg font-semibold p-4 border-b">Settings</h1>
        <div className="p-4">
          <ProfileSection session={session} />
          <SecuritySection />
          <NotificationsSection />
          <AppearanceSection />
          <BillingSection />
        </div>
      </div>
    </div>
  )
}
