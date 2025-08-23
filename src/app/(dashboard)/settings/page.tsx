import Settings from "./components/settings";

export default function SettingsPage() {
    return (
        <div className="flex justify-center h-full md:py-24">
            <div className="w-full max-w-6xl mx-4 md:border-4 md:rounded-2xl md:h-[600px]">
                <Settings />
            </div>
        </div>
    )
}