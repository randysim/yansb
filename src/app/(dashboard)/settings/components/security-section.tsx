import { Button } from '@/components/ui/button'

export default function SecuritySection() {
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
