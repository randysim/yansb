import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center py-24">
        <h1 className="font-bold text-6xl max-w-3xl p-4">Think less. Build more.</h1>
        <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground">
          Don't waste time re-inventing the wheel,
          <span className="font-semibold"> YANSB</span> has your MVP covered. Stop learning
          Next.js best practices, start shipping
          code to production.
        </h4>
        <div className="flex space-x-4 p-8">
          <Button>
            Get Started
          </Button>
          <Button>
            See Docs
          </Button>
        </div>

        
        <h4 className="text-3xl mt-20 font-semibold tracking-wide">Built using</h4>

        {/* COMPANY LOGOS */}
        <div className="relative flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden mt-10">
          <Marquee>
            <Image src="/images/drizzle-light-background.png" alt="Drizzle ORM" width={200} height={80} className="mx-8" />
            <Image src="/images/nextjs-light-background.png" alt="Next.js" width={360} height={80} className="mx-8" />
            <Image src="/images/authjs-light-background.png" alt="Auth.js" width={220} height={80} className="mx-8" />
            <Image src="/images/tailwind-light-background.png" alt="Tailwind CSS" width={410} height={80} className="mx-8" />
            <Image src="/images/ts-light-background.png" alt="Typescript" width={80} height={80} className="mx-8" />
            <Image src="/images/shadcnui-light-background.png" alt="shadcn/ui" width={340} height={80} className="mx-8" />
            <Image src="/images/postgresql-light-background.png" alt="PostgreSQL" width={78} height={80} className="mx-8" />
            <Image src="/images/stripe-light-background.png" alt="Stripe" width={190} height={80} className="mx-8" />
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
        
      </section>
    </div>
  );
}
