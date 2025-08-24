'use client'
import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import AuthButton from '@/app/components/auth-button'

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Docs', href: '/docs' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <nav className="backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold">
                        YANSB
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <AuthButton />
                    </div>

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
                                <AuthButton className="mt-4" />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
