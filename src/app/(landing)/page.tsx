import { auth, signIn } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>Yansb</h1>
      <p>
        {session ? `Signed in as ${session.user?.email}` : "Not signed in"}
      </p>

      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <button type="submit">Sign In</button>
      </form>
      
    </div>
  );
}
