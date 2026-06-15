import { QUERIES } from "~/server/db/queries";
import Questionnaire from "./_components/questionnaire";

export default async function Onboarding() {
  const teams = await QUERIES.getAllTeams();
  return (
    <div className="">
      <Questionnaire teams={teams} />
    </div>
  );
}
