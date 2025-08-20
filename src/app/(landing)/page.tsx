export default async function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center h-[550px] text-center">
        <h1 className="font-bold text-6xl max-w-3xl p-5">Think less. Build more.</h1>
        <h4 className="max-w-2xl text-lg">
          Don't waste time re-inventing the wheel, 
          YANSB has your MVP covered. Stop learning
          Next.js best practices, start shipping
          code to production.
        </h4>
      </section>
    </div>
  );
}
