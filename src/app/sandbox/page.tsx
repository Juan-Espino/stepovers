import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users_table } from "~/server/db/schema";

export default async function Sandbox() {
  const user = await auth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {user.userId ? (
        <form
          action={async () => {
            "use server";
            const newUser = await db.insert(users_table).values({
              id: user.userId,
              favoriteTeam: "Manchester United",
              playStyle: "Chaos",
            });
          }}
        >
          <button type="submit" className="cursor-pointer">
            Create User
          </button>
        </form>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
