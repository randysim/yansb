'use client'
import { useState, useRef, useEffect } from 'react'

type FAQItemProps = {
    question: string
    answer: string
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const content = contentRef.current
        if (!content) return

        if (isOpen) {
            // Opening: set to scrollHeight
            content.style.maxHeight = content.scrollHeight + 'px'
        } else {
            // Closing: set to 0
            content.style.maxHeight = '0px'
        }
    }, [isOpen])

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={toggleOpen}
                className="flex justify-between items-center w-full text-left cursor-pointer"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-medium text-gray-900">{question}</h3>
                <span
                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                >
                    ▼
                </span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div className="pt-3 pb-3 text-gray-600 text-left">{answer}</div>
            </div>
        </div>
    )
}
