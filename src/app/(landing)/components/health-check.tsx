'use client'
import { useState, useEffect } from 'react'

export default function HealthCheck() {
    const [healthy, setHealthy] = useState(undefined)

    useEffect(() => {
        const checkHealth = async () => {
            const res = await fetch('/api/health')
            const health = await res.json()
            setHealthy(health && health.status === 'ok')
        }
        checkHealth()
    }, [])

    return (
        <span className="bg-foreground text-background py-1 px-2 rounded-lg text-sm">
            {healthy === undefined ? 'Checking...' : healthy ? 'Operational' : 'Down'}
        </span>
    )
}
