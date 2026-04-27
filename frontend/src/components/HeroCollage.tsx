/**
 * Decorative hero collage — product preview (blue accents on zinc).
 */
export function HeroCollage() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_70%_30%,rgba(59,130,246,0.14),transparent_55%),radial-gradient(ellipse_at_30%_80%,rgba(37,99,235,0.12),transparent_50%)]"
      />

      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-blue-500/30"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-100">Jordan Lee</p>
              <p className="truncate text-xs text-zinc-500">Operations</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="rounded-md bg-blue-500/15 px-2 py-1 text-[0.65rem] font-medium text-blue-300">
              Active
            </span>
            <span className="rounded-md bg-white/5 px-2 py-1 text-[0.65rem] text-zinc-500">
              NYC
            </span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="pointer-events-none mt-4 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white opacity-95 shadow-lg shadow-blue-900/40"
          >
            Save contact
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-xl backdrop-blur-sm">
            <p className="text-[0.65rem] font-medium uppercase tracking-wider text-zinc-500">
              List completeness
            </p>
            <div className="mt-3 flex items-end justify-between gap-2">
              <p className="text-2xl font-semibold tabular-nums text-zinc-100">98%</p>
              <div className="flex h-8 items-end gap-0.5">
                {[40, 65, 45, 80, 55, 90].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1.5 rounded-sm bg-gradient-to-t from-blue-700 to-blue-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/95 p-3 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-xs text-zinc-400">Notifications</span>
              <span
                className="relative h-6 w-11 rounded-full bg-blue-600"
                aria-hidden="true"
              >
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
            <p className="text-xs font-medium text-zinc-400">Recent entries</p>
            <div className="flex gap-1">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`h-1.5 w-6 rounded-full ${n === 2 ? 'bg-blue-500' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {[
              ['Morgan Avery', 'morgan@studio.co', '28'],
              ['Sam Okonkwo', 'sam@northwind.io', '34'],
            ].map(([name, mail, age]) => (
              <div
                key={mail}
                className="flex items-center justify-between gap-3 rounded-xl bg-black/30 px-3 py-2 text-xs"
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
