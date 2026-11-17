import Image from "next/image";

// Presentation examples; these scores and the favorite-team label are not personalized.
const featuredMatches = [
  {
    image: "/images/matches/man-united-arsenal.png",
    homeTeam: "Man United",
    opponent: "Arsenal",
    label: "Must watch",
    rank: "#1",
    score: 92,
  },
  {
    image: "/images/matches/liverpool-everton.png",
    homeTeam: "Liverpool",
    opponent: "Everton",
    label: "Your favorite team",
    score: 86,
  },
];

export default function PredictBestMatches() {
  return (
    <section
      aria-labelledby="best-matches-heading"
      className="mt-16 flex justify-center lg:mt-24"
    >
      <div className="border-grey/30 w-[90%] rounded-[44px] border bg-[#2a2a2a]/70 px-4 py-6 sm:rounded-[64px] sm:p-8 lg:w-full lg:rounded-[92px] lg:p-10">
        <div className="mb-6 flex items-center justify-between gap-4 px-2 sm:mb-8 sm:px-4">
          <h2
            id="best-matches-heading"
            className="font-title flex flex-col gap-2 leading-none"
          >
            <span className="text-2xl text-white/60 sm:text-3xl lg:text-4xl">
              PREDICTS THIS WEEK&rsquo;S
            </span>
            <span className="text-4xl leading-[1.05] text-white sm:text-[52px] lg:text-[64px]">
              BEST{" "}
              <span className="from-red-start to-red-end bg-linear-to-r bg-clip-text text-transparent">
                MATCHES
              </span>
            </span>
          </h2>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 130 90"
            fill="none"
            style={{ animationDelay: "280ms" }}
            className="homepage-enter tactics-pulse text-grey h-auto w-16 shrink-0 sm:w-28 lg:w-32"
          >
            <g
              transform="rotate(-12 65 45)"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 18Q27 25 36 34M36 18Q29 25 20 34" />
              <path d="M57 56Q64 65 73 72M73 56Q64 63 57 72" />
              <path d="M97 16Q104 25 113 32M113 16Q106 23 97 32" />
              <path d="M68 8C84 7 85 31 69 32C53 34 51 10 68 8Z" />
              <path d="M30 55C46 53 47 78 31 79C15 81 13 57 30 55Z" />
            </g>
          </svg>
        </div>
        <div className="flex flex-col gap-4">
          {featuredMatches.map((match, index) => (
            <article
              key={match.opponent}
              style={{ animationDelay: `${360 + index * 100}ms` }}
              aria-label={`${match.homeTeam} versus ${match.opponent}`}
              className="homepage-enter relative isolate flex min-h-56 items-center justify-center overflow-hidden rounded-[28px] border border-white/10 px-3 py-6 text-center sm:min-h-64 sm:rounded-[36px] lg:min-h-72"
            >
              <Image
                src={match.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 1172px, (min-width: 1024px) 90vw, 85vw"
                className="-z-20 object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/45"
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <p
                  className={`font-body inline-flex items-center justify-center gap-3 rounded-full border border-white/35 bg-black/65 px-5 py-2.5 text-sm font-semibold uppercase sm:px-7 sm:py-3 sm:text-lg lg:text-xl ${match.rank ? "text-red-end" : "text-white"}`}
                >
                  {match.rank && (
                    <span className="text-white">{match.rank}</span>
                  )}
                  {match.label}
                </p>
                <h3 className="font-title flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-2xl leading-none text-white sm:gap-x-5 sm:text-3xl lg:text-4xl">
                  <span>{match.homeTeam}</span>
                  <span className="text-lg text-white/70 sm:text-xl">vs</span>
                  <span>{match.opponent}</span>
                </h3>
                <div className="mt-1 flex flex-col items-center gap-1">
                  <p className="font-body text-xs text-white/80 sm:text-sm">
                    Entertainment Score
                  </p>
                  <p className="font-title flex items-baseline justify-center gap-1 leading-none">
                    <span className="text-red-end text-4xl sm:text-5xl">
                      {match.score}
                    </span>
                    <span className="text-xl text-white sm:text-2xl">
                      / 100
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
