import { requireOnboardedUser } from "~/server/auth/require-onboarded-user";

export default async function Dashboard() {
  const user = await requireOnboardedUser();
  return (
    <div className="flex flex-col text-white">
      <div>{user.favoriteTeam}</div>
    </div>
  );
}
