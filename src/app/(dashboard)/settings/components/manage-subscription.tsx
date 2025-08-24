import { Button } from '@/components/ui/button'

export default function ManageButton({ customerId }: { customerId: string }) {
    const handleManageSubscription = async () => {
        try {
            const response = await fetch('/api/subscriptions/manage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId }),
            })

            if (response.status !== 200) {
                throw new Error('Failed to create customer portal.')
            }

            const { url } = await response.json()
            window.open(url, '_blank')
        } catch (error) {
            console.error(`Error managing subscription: ${error}`)
        }
    }

    return <Button onClick={handleManageSubscription}>Manage Plan</Button>
}
