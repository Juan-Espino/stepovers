import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { users_table } from "../db/schema";

export async function requireOnboardedUser() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.query.users_table.findFirst({
    where: eq(users_table.id, userId),
  });

  if (!user) redirect("/onboarding");

  return user;
}
