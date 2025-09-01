'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'

import { useSession, signOut } from 'next-auth/react'

function UserDropdown() {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    if (!session || !session.user) return null

    return (
        <div className="relative select-none" ref={menuRef}>
            <div
                className="flex items-center space-x-2 border-2 border-transparent transition-all duration-150 animate-in cursor-pointer rounded-full hover:border-foreground/20"
                onClick={() => setOpen((v) => !v)}
            >
                <Image
                    src={session.user.image || 'undefined'}
                    alt={session.user.name || 'undefined'}
                    className="h-8 w-8 rounded-full"
                />

                {/* Downward modern arrow */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M6 8l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border">
                    {/* Row 1: PFP and name */}
                    <div className="flex items-center space-x-3 px-4 py-3 border-b">
                        <Image
                            src={session.user.image || 'undefined'}
                            alt={session.user.name || 'undefined'}
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium">{session.user.name || 'User'}</span>
                    </div>

                    {/* Row 2: Settings */}
                    <Link href="/settings" onClick={() => setOpen(false)}>
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b cursor-pointer">
                            Settings
                        </button>
                    </Link>

                    {/* Row 3: Sign out */}
                    <button
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-destructive cursor-pointer"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [{ name: 'Dashboard', href: '/dashboard' }]

    return (
        <nav className="backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/dashboard" className="text-xl font-bold">
                        YANSB
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="flex">
                        <div className="hidden md:flex items-center space-x-8 mr-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <UserDropdown />

                        {/* Mobile Navigation */}

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="sm">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetTitle className="hidden">Navigation</SheetTitle>
                                <div className="flex flex-col space-y-4 mt-8 items-center">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium transition-colors hover:text-primary"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}
