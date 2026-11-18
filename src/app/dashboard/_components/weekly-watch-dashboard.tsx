import Image from "next/image";
import LeagueTitle from "~/app/_components/league-title";

type TeamDisplay = {
  readonly name: string;
  readonly shortName: string;
  readonly badgeUrl: string;
};

type MatchDisplay = {
  readonly id: string;
  readonly kickoff: string;
  readonly date: string;
  readonly calendarDate: string;
  readonly homeTeam: TeamDisplay;
  readonly awayTeam: TeamDisplay;
  readonly entertainmentScore: number;
};

type FavoriteVerdict = {
  readonly label: string;
  readonly detail: string;
  readonly tone: "watch" | "pass";
};

export type DashboardData = {
  readonly preview?: boolean;
  readonly gameweek: number;
  readonly season: string;
  readonly favoriteTeam: string;
  readonly featuredMatch: MatchDisplay | null;
  readonly featuredReason: string;
  readonly favoriteMatch: MatchDisplay | null;
  readonly favoriteVerdict: FavoriteVerdict;
  readonly matches: readonly MatchDisplay[];
};

function FeaturedTeam({ team }: { team: TeamDisplay }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <Image
        className="size-11 object-contain"
        alt={`${team.shortName} badge`}
        src={team.badgeUrl}
        width={44}
        height={44}
      />
      <p className="font-title text-center text-2xl leading-none text-white sm:text-3xl">
        {team.name}
      </p>
    </div>
  );
}

function FeatureCard({
  match,
  image,
  detail,
  emptyMessage,
  heading,
  headingTone = "neutral",
}: {
  match: MatchDisplay | null;
  image: string;
  detail: string;
  emptyMessage: string;
  heading: string;
  headingTone?: "neutral" | "watch";
}) {
  return (
    <article
      aria-label={heading === "top pick" ? "Top pick" : "Your team"}
      className="dashboard-feature relative isolate flex min-h-56 flex-col justify-center gap-4 overflow-hidden rounded-[32px] border border-white/10 bg-[#171717] p-5 lg:flex-1"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1280px) 620px, (min-width: 1024px) 48vw, 95vw"
        className="-z-20 scale-105 object-cover blur-[0.5px]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
      <h2
        className={`font-body text-center text-xs font-bold uppercase ${headingTone === "watch" ? "text-red-start" : "text-white/70"}`}
      >
        {heading}
      </h2>
      {match ? (
        <>
          <div className="grid flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
            <FeaturedTeam team={match.homeTeam} />
            <span className="font-title text-2xl text-white/60">vs</span>
            <FeaturedTeam team={match.awayTeam} />
          </div>
          <div className="dashboard-feature-summary -mx-5 -mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/10 bg-[#080808]/95 px-5 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
            <div className="flex flex-col gap-1">
              <span className="font-body text-xs text-white/60">kickoff</span>
              <span className="font-body text-sm font-bold whitespace-nowrap text-white sm:text-lg">
                {match.kickoff}
              </span>
            </div>
            <p className="font-body order-3 col-span-2 w-3/4 justify-self-center text-sm leading-relaxed text-white/85 sm:order-none sm:col-span-1">
              {detail}
            </p>
            <div className="flex flex-col items-end gap-1">
              <span className="font-body text-[11px] text-white/60">score</span>
              <span
                aria-label={`Entertainment score ${match.entertainmentScore} out of 100`}
                className="font-title text-red-end text-4xl leading-none tabular-nums"
              >
                {match.entertainmentScore}
                <span className="ml-1 text-base text-white/65">/100</span>
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="font-title text-3xl text-white">{emptyMessage}</h3>
          <p className="font-body max-w-sm text-sm text-white/70">{detail}</p>
        </div>
      )}
    </article>
  );
}

function SlateMatch({
  match,
  entranceIndex,
}: {
  match: MatchDisplay;
  entranceIndex: number;
}) {
  return (
    <article
      data-match-id={match.id}
      style={{ animationDelay: `${560 + entranceIndex * 90}ms` }}
      aria-label={`${match.homeTeam.name} versus ${match.awayTeam.name}`}
      className="dashboard-match grid min-h-12 grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)_2rem] items-center rounded-[18px] bg-[#202020] px-3 py-2 text-white"
    >
      <div className="flex min-w-0 items-center gap-2 pr-2">
        <Image
          className="dashboard-team-badge size-8 shrink-0 object-contain"
          alt={`${match.homeTeam.shortName} badge`}
          src={match.homeTeam.badgeUrl}
          width={32}
          height={32}
        />
        <span
          title={match.homeTeam.name}
          className="dashboard-team-name font-body min-w-0 text-xs leading-snug wrap-break-word sm:text-sm"
        >
          {match.homeTeam.shortName}
        </span>
      </div>
      <span className="dashboard-kickoff font-body flex min-w-24 items-center justify-center self-stretch border-x border-white/45 px-3 text-xs whitespace-nowrap tabular-nums sm:min-w-28 sm:text-sm">
        {match.kickoff}
      </span>
      <div className="flex min-w-0 items-center justify-end gap-2 px-2">
        <span
          title={match.awayTeam.name}
          className="dashboard-team-name font-body min-w-0 text-right text-xs leading-snug wrap-break-word sm:text-sm"
        >
          {match.awayTeam.shortName}
        </span>
        <Image
          className="dashboard-team-badge size-8 shrink-0 object-contain"
          alt={`${match.awayTeam.shortName} badge`}
          src={match.awayTeam.badgeUrl}
          width={32}
          height={32}
        />
      </div>
      <span
        aria-label={`Entertainment score ${match.entertainmentScore} out of 100`}
        className={`dashboard-match-score font-title text-right text-2xl leading-none tabular-nums ${match.entertainmentScore === 0 ? "text-white/60" : "text-red-end"}`}
      >
        {match.entertainmentScore}
      </span>
    </article>
  );
}

export default function WeeklyWatchDashboard({
  gameweek,
  season,
  preview = false,
  favoriteTeam,
  featuredMatch,
  featuredReason,
  favoriteMatch,
  favoriteVerdict,
  matches,
}: DashboardData) {
  const highlightedMatchIds = new Set(
    [featuredMatch, favoriteMatch].flatMap((match) =>
      match ? [match.id] : [],
    ),
  );
  const slateMatches = matches
    .filter((match) => !highlightedMatchIds.has(match.id))
    .sort((a, b) => a.calendarDate.localeCompare(b.calendarDate));
  const slateOrder = new Map(
    slateMatches.map((match, index) => [match.id, index]),
  );
  const dates = new Map<string, MatchDisplay[]>();
  for (const match of slateMatches) {
    const day = dates.get(match.date) ?? [];
    day.push(match);
    dates.set(match.date, day);
  }

  return (
    <main className="dashboard flex flex-1 flex-col gap-5 text-white">
      <section className="dashboard-heading flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-title text-[40px] leading-none sm:text-[56px]">
            Matches of the{" "}
            <span className="from-red-start to-red-end bg-linear-to-r bg-clip-text text-transparent">
              Week
            </span>
          </h1>
          <p className="font-body mt-2 text-base text-white/60">
            All calculated fixture scores for{" "}
            {gameweek ? `gameweek ${gameweek}` : "this gameweek"}.
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-3">
          <div className="dashboard-league flex flex-col items-center gap-1">
            <LeagueTitle />
            <p className="font-body text-base text-white/60">
              season {season}
              {preview && (
                <span title="Simulated dates and kickoff times for layout testing">
                  {" "}
                  &middot; 4-day preview
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Equal columns: 2 x ((100% - 16px) / 2) + 16px = 100%. */}
      <section
        aria-label="Featured matches"
        className="dashboard-feature-grid grid gap-4 lg:grid-cols-2"
      >
        <FeatureCard
          heading="top pick"
          match={featuredMatch}
          image="/images/dashboard/top-pick-stadium.png"
          detail={featuredReason}
          emptyMessage="no top pick"
        />
        <FeatureCard
          heading={favoriteVerdict.label}
          headingTone={favoriteVerdict.tone === "watch" ? "watch" : "neutral"}
          match={favoriteMatch}
          image="/images/dashboard/your-team-corner.png"
          detail={favoriteVerdict.detail}
          emptyMessage={`No listed fixture for ${favoriteTeam} this gameweek.`}
        />
      </section>

      <section
        aria-labelledby="slate-heading"
        className={`dashboard-slate flex flex-col gap-2 ${dates.size > 1 ? "dashboard-slate-multiple" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="slate-heading" className="font-title text-4xl text-white">
            gameweek slate
          </h2>
        </div>
        {slateMatches.length > 0 ? (
          <div
            className={`dashboard-day-groups relative grid gap-4 ${dates.size > 1 ? "lg:grid-cols-2" : ""}`}
          >
            <span className="font-body absolute top-0 right-0 text-xs leading-6 text-white/60 sm:text-sm">
              {slateMatches.length} More{" "}
              {slateMatches.length === 1 ? "fixture" : "fixtures"}
            </span>
            {[...dates.entries()].map(([date, dayMatches]) => (
              <div key={date} className="flex min-w-0 flex-col gap-2">
                <h3 className="font-body pr-28 text-base font-normal text-white/60">
                  {date}
                </h3>
                <div
                  className={`dashboard-slate-grid grid gap-2 ${dates.size === 1 ? "lg:grid-cols-2" : ""}`}
                >
                  {dayMatches.map((match) => (
                    <SlateMatch
                      key={match.id}
                      match={match}
                      entranceIndex={slateOrder.get(match.id) ?? 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="font-body self-end text-xs text-white/60 sm:text-sm">
              {slateMatches.length} More fixtures
            </span>
            <p className="font-body text-sm text-white/60">
              {matches.length > 0
                ? "All fixtures this gameweek are featured above."
                : "No fixtures scheduled this gameweek."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
