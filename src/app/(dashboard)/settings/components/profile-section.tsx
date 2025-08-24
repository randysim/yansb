import { User } from "lucide-react"
import { Session } from "next-auth"
import { Button } from "@/components/ui/button"

export default function ProfileSection({ session }: { session: Session | null }) {
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