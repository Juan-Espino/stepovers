import LeagueTitle from "~/app/_components/league-title";

type TeamDisplay = {
  readonly name: string;
  readonly shortName: string;
};

type MatchDisplay = {
  readonly id: string;
  readonly kickoff: string;
  readonly homeTeam: TeamDisplay;
  readonly awayTeam: TeamDisplay;
  readonly entertainmentScore: number;
};

type FavoriteVerdict = {
  readonly label: string;
  readonly detail: string;
  readonly tone: "watch" | "pass";
};

type WeeklyWatchDashboardProps = {
  readonly gameweek: number;
  readonly season: string;
  readonly favoriteTeam: string;
  readonly featuredMatch: MatchDisplay;
  readonly featuredReason: string;
  readonly favoriteMatch: MatchDisplay | null;
  readonly favoriteVerdict: FavoriteVerdict;
  readonly matches: readonly MatchDisplay[];
};

function TeamMark({
  team,
  align = "start",
}: {
  team: TeamDisplay;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 items-center gap-3 ${
        align === "center" ? "justify-center text-center" : ""
      }`}
    >
      <div className="border-grey/30 flex size-11 shrink-0 items-center justify-center rounded-full border bg-white text-sm font-black text-black">
        {team.shortName}
      </div>
      <p
        className={`font-body min-w-0 text-sm font-bold text-white sm:text-base ${
          align === "center" ? "max-w-48 text-center" : "truncate"
        }`}
      >
        {team.name}
      </p>
    </div>
  );
}

function ScorePill({ score }: { score: number }) {
  return (
    <div className="border-grey/30 flex size-16 shrink-0 flex-col items-center justify-center rounded-full border bg-white text-black">
      <span className="font-title text-3xl leading-none">{score}</span>
      <span className="font-body text-[9px] font-bold uppercase">watch</span>
    </div>
  );
}

function FeaturedTeam({ team }: { team: TeamDisplay }) {
  return (
    <div className=" flex min-w-0 flex-col items-center gap-3 rounded-[28px]  px-4 py-5">
      <div className="border border-grey/20 flex size-16 items-center justify-center rounded-full  p-[2px]">
        <div className="flex size-full items-center justify-center rounded-full text-white text-lg font-black ">
          {team.shortName}
        </div>
      </div>
      <p className="font-title max-w-full text-center text-4xl leading-none text-white sm:text-5xl">
        {team.name}
      </p>
    </div>
  );
}

function MatchCard({
  match,
  isHighlighted = false,
}: {
  match: MatchDisplay;
  isHighlighted?: boolean;
}) {
  return (
    <article
      className={`border-grey/20 flex flex-col gap-3 rounded-3xl border p-3 ${
        isHighlighted ? "bg-white/10" : "bg-[#171717]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-body text-grey text-xs font-bold uppercase">
          {match.kickoff}
        </span>
        <span className="font-title from-red-start to-red-end bg-linear-to-r bg-clip-text text-2xl text-transparent">
          {match.entertainmentScore}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <TeamMark team={match.homeTeam} />
        <div className="bg-grey/30 h-px" />
        <TeamMark team={match.awayTeam} />
      </div>
    </article>
  );
}

function FavoritePanel({
  favoriteTeam,
  favoriteMatch,
  verdict,
}: {
  favoriteTeam: string;
  favoriteMatch: MatchDisplay | null;
  verdict: FavoriteVerdict;
}) {
  return (
    <section className="border-grey/20 flex flex-col gap-5 rounded-[32px] border bg-[#171717] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-grey text-xs font-bold uppercase">
            your team
          </p>
          <h2 className="font-title mt-1 text-4xl leading-none text-white">
            {favoriteTeam}
          </h2>
        </div>
        <div
          className={`rounded-full border px-4 py-2 text-center ${
            verdict.tone === "watch"
              ? "border-red-start/50 bg-red-start/10"
              : "border-grey/30 bg-white/5"
          }`}
        >
          <p
            className={`font-body text-xs font-black uppercase ${
              verdict.tone === "watch" ? "text-red-start" : "text-grey"
            }`}
          >
            {verdict.label}
          </p>
        </div>
      </div>

      <p className="font-body text-grey text-sm leading-relaxed">
        {verdict.detail}
      </p>

      {favoriteMatch ? (
        <MatchCard match={favoriteMatch} isHighlighted />
      ) : (
        <div className="border-grey/20 rounded-3xl border bg-white/5 p-4">
          <p className="font-body text-sm text-white">
            No listed fixture for {favoriteTeam} this gameweek.
          </p>
        </div>
      )}
    </section>
  );
}

export default function WeeklyWatchDashboard({
  gameweek,
  season,
  favoriteTeam,
  featuredMatch,
  featuredReason,
  favoriteMatch,
  favoriteVerdict,
  matches,
}: WeeklyWatchDashboardProps) {
  return (
    <main className="flex flex-1 flex-col gap-8 text-white">
      <section className="flex flex-col items-center gap-5 text-center">
        <div className="flex flex-col items-center gap-5">
          <LeagueTitle />
          <div>
            <p className="font-body text-grey text-sm font-bold uppercase">
              gameweek {gameweek} / {season}
            </p>
            <h1 className="font-title mt-2 text-6xl leading-none sm:text-7xl lg:text-8xl">
              match of the
              <span className="from-red-start to-red-end block bg-linear-to-r bg-clip-text text-transparent">
                week
              </span>
            </h1>
          </div>
        </div>
        <p className="font-body text-grey max-w-xl text-sm leading-relaxed sm:text-base">
          {featuredReason}
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="border-grey/20 flex flex-col items-center gap-6 rounded-[36px] border bg-[#171717] p-5 text-center sm:p-6">
          <div className="relative flex w-full items-start justify-center">
            <p className="font-body text-grey pt-2 text-center text-xs font-bold uppercase">
              top pick
            </p>
            <div className="absolute top-0 right-0">
              <ScorePill score={featuredMatch.entertainmentScore} />
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <FeaturedTeam team={featuredMatch.homeTeam} />
            <div className="from-red-start to-red-end font-title mx-auto flex size-16 items-center justify-center rounded-full bg-linear-to-r text-3xl text-white shadow-[0_0_30px_rgba(254,91,75,0.25)]">
              vs
            </div>
            <FeaturedTeam team={featuredMatch.awayTeam} />
          </div>

          <div className="border-grey/20 flex w-full flex-col items-center gap-3 rounded-3xl border bg-black/20 p-4">
            <span className="font-body text-grey text-xs font-bold uppercase">
              kickoff
            </span>
            <span className="font-body text-lg font-bold text-white">
              {featuredMatch.kickoff}
            </span>
          </div>
        </article>

        <FavoritePanel
          favoriteTeam={favoriteTeam}
          favoriteMatch={favoriteMatch}
          verdict={favoriteVerdict}
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-title text-4xl text-white">gameweek slate</h2>
          <span className="font-body text-grey text-xs font-bold uppercase">
            {matches.length} fixtures
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}
