import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/magicui/marquee'
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid'
import Image from 'next/image'
import { ComputerIcon, DatabaseIcon, DollarSignIcon, ShieldIcon } from 'lucide-react'
import { cloneElement } from 'react'
import { PricingSection } from '../components/pricing'
import { products } from '../lib/stripe'
import ScrollToTop from './components/scroll-to-top'
import FAQItem from './components/faq-item'
import AuthButton from '../components/auth-button'
import { auth } from '@/auth'
import Link from 'next/link'

export default async function Home() {
    const session = await auth()

    const heroMarqueeImages = [
        <Image src="/images/drizzle-light-background.png" alt="Drizzle ORM" width={200} height={80} className="mx-8" />,
        <Image src="/images/nextjs-light-background.png" alt="Next.js" width={360} height={80} className="mx-8" />,
        <Image src="/images/authjs-light-background.png" alt="Auth.js" width={220} height={80} className="mx-8" />,
        <Image
            src="/images/tailwind-light-background.png"
            alt="Tailwind CSS"
            width={410}
            height={80}
            className="mx-8"
        />,
        <Image src="/images/ts-light-background.png" alt="Typescript" width={80} height={80} className="mx-8" />,
        <Image src="/images/shadcnui-light-background.png" alt="shadcn/ui" width={340} height={80} className="mx-8" />,
        <Image
            src="/images/postgresql-light-background.png"
            alt="PostgreSQL"
            width={78}
            height={80}
            className="mx-8"
        />,
        <Image src="/images/stripe-light-background.png" alt="Stripe" width={190} height={80} className="mx-8" />,
    ]

    /* This bento-grid has 3 columns. Each card can take up 1-3 columns and X amount of rows */
    const bentoBackgroundClass = 'absolute top-0 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]'
    const features = [
        {
            Icon: DatabaseIcon,
            name: 'Drizzle ORM',
            description: 'Manage data, migrations, and schema with Drizzle all set up.',
            className: 'col-span-3 lg:col-span-1 text-left',
            href: '#',
            cta: 'Learn More',
            background: (
                <Image
                    src="/images/drizzle-orm.png"
                    alt="Drizzle ORM"
                    width={460}
                    height={460}
                    className={bentoBackgroundClass}
                />
            ),
        },
        {
            Icon: ShieldIcon,
            name: 'Auth.js',
            description: 'Your endpoints are protected with Auth.js (NextAuth) using session tokens.',
            className: 'col-span-3 lg:col-span-1 text-left',
            href: '#',
            cta: 'Learn More',
            background: (
                <Image
                    src="/images/authjs.png"
                    alt="Auth.js"
                    width={460}
                    height={460}
                    className={`${bentoBackgroundClass} top-15 left-10`}
                />
            ),
        },
        {
            Icon: DollarSignIcon,
            name: 'Stripe',
            description: 'Subscription logic comes out of the box. A few tweaks and it should be good to go.',
            className: 'col-span-3 row-span-1 lg:col-span-1 lg:row-span-2 text-left',
            href: '#',
            cta: 'Learn More',
            background: (
                <Image
                    src="/images/stripe.png"
                    alt="Stripe"
                    width={460}
                    height={500}
                    className={`${bentoBackgroundClass}`}
                />
            ),
        },
        {
            Icon: ComputerIcon,
            name: 'Dev-Ops',
            description:
                "YANSB comes with robust logging, code-formatting, and deployments. Write bullet-proof code, push, and it's deployed.",
            className: 'col-span-3 lg:col-span-2 text-left',
            href: '#',
            cta: 'Learn More',
            background: (
                <Image
                    src="/images/devops.png"
                    alt="Dev-Ops"
                    width={800}
                    height={500}
                    className={`${bentoBackgroundClass}`}
                />
            ),
        },
    ]

    return (
        <div className="pb-24">
            {/* HERO SECTION */}
            <section className="flex flex-col items-center text-center py-24">
                <h1 className="font-bold text-6xl max-w-3xl p-4">Think less. Build more.</h1>
                <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground">
                    Don't waste time re-inventing the wheel,
                    <span className="font-semibold"> YANSB</span> has your MVP covered. Stop learning Next.js best
                    practices, start shipping code to production.
                </h4>
                <div className="flex space-x-4 p-8">
                    {session ? (
                        <Link href="/dashboard">
                            <Button>Go To Dashboard</Button>
                        </Link>
                    ) : (
                        <AuthButton />
                    )}
                    <a href="https://github.com/randysim/yansb" target="_blank">
                        <Button variant="outline">View on Github</Button>
                    </a>
                </div>

                <h4 className="text-3xl mt-20 font-semibold tracking-wide">Built using</h4>

                {/* COMPANY LOGOS */}
                <div className="relative flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden mt-10">
                    <Marquee>{heroMarqueeImages.map((img, idx) => cloneElement(img, { key: idx }))}</Marquee>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="flex flex-col items-center text-center py-24">
                <h1 className="font-semibold text-4xl tracking-wide p-4">Why Start From Zero?</h1>
                <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground">
                    <span className="font-semibold"> YANSB</span> comes with everything you need to ship day of. Here's
                    everything we're giving you, free of charge.
                </h4>

                <BentoGrid className="w-full max-w-6xl mt-16 p-8">
                    {features.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid>
            </section>

            {/* PRICING SECTION */}
            <section className="flex flex-col items-center text-center py-24">
                <h1 className="font-semibold text-4xl tracking-wide p-4">Customize Pricing</h1>
                <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground mb-16">
                    Because you might need to serve customers of all sizes.
                </h4>

                <PricingSection products={products} href="/signin" />
            </section>

            {/* CTA */}
            <section className="flex flex-col items-center text-center py-24">
                <h1 className="font-semibold text-4xl tracking-wide p-4">Ready to Get Started?</h1>
                <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground mb-8">
                    Clone this repository completely for free and start building your MVP today.
                </h4>

                <ScrollToTop>Get Started</ScrollToTop>
            </section>

            {/* FAQ SECTION */}
            <section className="flex flex-col items-center text-center py-24">
                <h1 className="font-semibold text-4xl tracking-wide p-4">Frequently Asked Questions</h1>
                <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground mb-16">
                    Got questions? We've got answers.
                </h4>

                <div className="w-full max-w-3xl space-y-4 px-8 md:px-0">
                    <FAQItem
                        question="What is YANSB?"
                        answer="YANSB (Yet Another Next.js Starter Boilerplate) is a complete Next.js starter template that includes authentication, database setup, payments, and deployment configuration to help you ship your MVP faster."
                    />
                    <FAQItem
                        question="Do I need to pay for YANSB?"
                        answer="No, YANSB is completely free to use. You can clone the repository and start building immediately without any cost."
                    />
                    <FAQItem
                        question="What technologies are included?"
                        answer="YANSB comes with Next.js, TypeScript, Tailwind CSS, Drizzle ORM, Auth.js, Stripe integration, PostgreSQL support, and shadcn/ui components."
                    />
                    <FAQItem
                        question="Is YANSB suitable for production?"
                        answer="Absolutely! YANSB is built with production-ready best practices including proper authentication, database migrations, error handling, and deployment configurations."
                    />
                    <FAQItem
                        question="How do I customize the starter template?"
                        answer="Simply clone the repository, install dependencies, and start modifying the code to fit your needs. The codebase is well-structured and documented to make customization straightforward."
                    />
                </div>
            </section>
        </div>
    )
}
