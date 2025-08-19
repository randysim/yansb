import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Yansb</h1>
      <p>
        {session ? `Signed in as ${session.user?.email}` : "Not signed in"}
      </p>
      
    </div>
  );
}
