export default function AppearanceSection() {
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