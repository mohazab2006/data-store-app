/**
 * Bento-style hero collage — layered grid, glass surfaces, blue accents on zinc.
 */
export function HeroCollage() {
  return (
    <div className="relative isolate w-full max-w-xl lg:mx-0 lg:max-w-none">
      {/* Ambient glow behind collage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[12%] rounded-[2.5rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,130,246,0.22),transparent_62%),radial-gradient(ellipse_at_80%_80%,rgba(37,99,235,0.14),transparent_55%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.07]"
      />

      <div className="relative grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-6 lg:gap-4">
        {/* Profile — tall left */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-900/75 p-5 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl lg:col-span-5 lg:row-span-4 lg:min-h-[280px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl"
          />
          <div className="relative flex items-center gap-4">
            <div
              className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg shadow-blue-950/50 ring-2 ring-blue-400/25"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-tight text-zinc-100">Jordan Lee</p>
              <p className="truncate text-xs text-zinc-500">Operations · Primary</p>
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-2">
            <span className="rounded-lg bg-blue-500/15 px-2.5 py-1 text-[0.65rem] font-semibold text-blue-300 ring-1 ring-blue-400/20">
              Active
            </span>
            <span className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-[0.65rem] text-zinc-400 ring-1 ring-white/[0.06]">
              NYC
            </span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="pointer-events-none relative mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-xs font-semibold text-white shadow-[0_12px_32px_-12px_rgba(37,99,235,0.65)] ring-1 ring-white/10"
          >
            Save contact
          </button>
        </div>

        {/* Completeness — top right wide */}
        <div className="rounded-2xl border border-white/[0.09] bg-zinc-900/75 p-5 shadow-xl backdrop-blur-xl lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:col-start-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                List completeness
              </p>
              <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-zinc-50">98%</p>
            </div>
            <div className="flex h-12 items-end gap-1">
              {[38, 72, 52, 88, 48, 95].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-2 rounded-md bg-gradient-to-t from-blue-800 to-blue-400 shadow-sm shadow-blue-950/40"
                />
              ))}
            </div>
          </div>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.45)]" />
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-white/[0.09] bg-zinc-900/75 p-4 shadow-lg backdrop-blur-xl lg:col-span-4 lg:row-span-2 lg:row-start-3 lg:col-start-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Alerts</span>
            <span className="relative h-7 w-12 rounded-full bg-blue-600 shadow-inner shadow-black/40" aria-hidden="true">
              <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-md ring-2 ring-blue-700/30" />
            </span>
          </div>
          <p className="mt-4 text-[0.7rem] leading-relaxed text-zinc-500">
            Digest on · you’ll see new entries here first.
          </p>
        </div>

        {/* Decorative accent tile */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-950/80 via-zinc-900/90 to-zinc-950 p-4 shadow-lg lg:col-span-3 lg:row-span-2 lg:row-start-3 lg:col-start-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 bottom-0 h-24 w-24 rounded-full bg-blue-500/25 blur-2xl"
          />
          <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-blue-300/90">
            Focus
          </p>
          <p className="relative mt-3 text-xs font-medium leading-snug text-zinc-300">
            One glance. Everyone who matters.
          </p>
          <div className="relative mt-4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 flex-1 rounded-full bg-blue-400/40" />
            ))}
          </div>
        </div>

        {/* Recent entries — full bleed bottom */}
        <div className="rounded-2xl border border-white/[0.09] bg-zinc-900/75 p-5 shadow-xl backdrop-blur-xl lg:col-span-12 lg:row-span-2 lg:row-start-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Recent entries</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={`h-2 w-8 rounded-full transition-colors ${n === 3 ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.45)]' : 'bg-white/[0.08]'}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ['Morgan Avery', 'morgan@studio.co', '28'],
              ['Sam Okonkwo', 'sam@northwind.io', '34'],
            ].map(([name, mail, age]) => (
              <div
                key={mail}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.04] bg-black/35 px-4 py-3 text-xs ring-1 ring-white/[0.03]"
              >
                <span className="font-medium text-zinc-200">{name}</span>
                <span className="hidden truncate text-zinc-500 sm:inline">{mail}</span>
                <span className="tabular-nums text-zinc-500">{age}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
