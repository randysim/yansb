export default function NotificationsSection() {
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
