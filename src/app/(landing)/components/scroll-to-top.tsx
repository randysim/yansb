'use client'
import { Button } from '@/components/ui/button'

export default function ScrollToTop({ children }: { children: React.ReactNode }) {
    return <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{children}</Button>
}
