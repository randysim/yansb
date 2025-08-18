import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div>
      <h1>Yansb</h1>
      <p>
        {session ? `Signed in as ${session.user?.email}` : "Not signed in"}
      </p>
      
    </div>
  );
}
