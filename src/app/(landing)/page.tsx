import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center h-[512px] text-center">
        <h1 className="font-bold text-6xl max-w-3xl p-4">Think less. Build more.</h1>
        <h4 className="px-4 max-w-2xl md:text-lg text-muted-foreground">
          Don't waste time re-inventing the wheel, 
          YANSB has your MVP covered. Stop learning
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
      </section>
    </div>
  );
}
