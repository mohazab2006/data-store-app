import { useCallback, useEffect, useState } from 'react'
import { HeroCollage } from './components/HeroCollage'
import { EditUserForm } from './components/EditUserForm'
import { UserForm } from './components/UserForm'
import { UserList } from './components/UserList'
import { deleteUser, getUsers } from './services/userService'
import type { User } from './types/User'
import { getApiErrorMessage } from './utils/apiError'

const shell = 'mx-auto max-w-6xl px-6'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<User | null>(null)
  const [banner, setBanner] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setBanner({ tone: 'error', text: getApiErrorMessage(err) })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      void refresh()
    }, 0)
    return () => window.clearTimeout(handle)
  }, [refresh])

  useEffect(() => {
    if (!banner) {
      return undefined
    }
    const timer = window.setTimeout(() => setBanner(null), 6800)
    return () => window.clearTimeout(timer)
  }, [banner])

  async function handleDelete(user: User) {
    if (user.id == null) {
      return
    }
    try {
      await deleteUser(user.id)
      if (editing?.id === user.id) {
        setEditing(null)
      }
      setBanner({ tone: 'success', text: `${user.name} has been removed.` })
      await refresh()
    } catch (err) {
      setBanner({ tone: 'error', text: getApiErrorMessage(err) })
    }
  }

  const contactCount = loading ? '—' : String(users.length)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav
        className={`${shell} flex h-[3.25rem] items-center justify-between border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/60`}
        aria-label="Primary"
      >
        <a
          href="#"
          className="group flex items-center gap-3 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
        >
          <span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800/90 to-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04] transition group-hover:border-blue-500/35 group-hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.35)]"
            aria-hidden="true"
          >
            <span className="absolute inset-[7px] flex flex-col justify-center gap-[5px]">
              <span className="h-[3px] w-full rounded-full bg-zinc-600/90" />
              <span className="h-[3px] w-2/3 rounded-full bg-blue-400" />
              <span className="h-[3px] w-full rounded-full bg-zinc-600/60" />
            </span>
          </span>
          <span className="flex flex-col gap-0.5 text-left">
            <span className="flex items-baseline gap-0.5 text-[0.9375rem] font-semibold tracking-[-0.02em] text-zinc-50">
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Dir</span>
              <span className="text-zinc-100">ectory</span>
            </span>
            <span className="hidden text-[0.625rem] font-medium uppercase tracking-[0.22em] text-zinc-500 sm:block">
              People in one place
            </span>
          </span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="#why-directory"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-100 md:inline"
          >
            Overview
          </a>
          <a
            href="#workspace"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-100"
          >
            Workspace
          </a>
          <a
            href="#workspace"
            className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-sm font-semibold text-blue-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-blue-400/40 hover:bg-blue-500/15"
          >
            Open app
          </a>
        </div>
      </nav>

      <header className="border-b border-white/[0.06] bg-zinc-950">
        <div className={`${shell} pb-10 pt-10 lg:pb-14 lg:pt-12`}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                When the spreadsheet won’t do
              </p>
              <h1 className="mt-6 max-w-xl text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-50 sm:text-4xl lg:text-[2.625rem] lg:leading-[1.08]">
                Your people,{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  organized without the noise.
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-400 lg:text-[0.9375rem]">
                Keep names, emails, and ages in one calm view. Add someone in a moment, fix a detail when
                life changes, and always know what’s on file—without digging through tabs or threads.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#workspace"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-blue-900/40 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Start in the workspace
                  <span aria-hidden="true" className="text-base leading-none">
                    →
                  </span>
                </a>
                <a
                  href="#why-directory"
                  className="cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.06]"
                >
                  What you get
                </a>
              </div>
            </div>

            <HeroCollage />
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-3">
            {[
              {
                label: 'In your directory',
                value: contactCount,
                hint: loading ? 'Pulling up your people…' : 'Everyone you’ve saved shows up here.',
              },
              {
                label: 'Capture',
                value: 'Quick',
                hint: 'Add a contact in one pass—no clutter, no extra steps.',
              },
              {
                label: 'Changes',
                value: 'Yours',
                hint: 'Nothing updates until you confirm—you stay in control.',
              },
            ].map((cell) => (
              <div key={cell.label} className="bg-zinc-950/95 px-5 py-5 text-left">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {cell.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-zinc-50">
                  {cell.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{cell.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
            {[
              [
                'Scan-friendly',
                'Hierarchy and spacing tuned so names and emails are easy to skim under pressure.',
              ],
              [
                'Edit with intent',
                'Open a row, adjust what changed, save when you mean it—or walk away cleanly.',
              ],
              [
                'Quiet confidence',
                'Feedback that confirms what happened without shouting—built for focus.',
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-xl border border-white/[0.06] bg-zinc-900/40 px-4 py-4 text-left"
              >
                <p className="text-sm font-semibold text-zinc-100">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{body}</p>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none mt-10 h-px w-full bg-gradient-to-r from-transparent via-blue-500/35 to-transparent"
          />
        </div>
      </header>

      <section
        id="why-directory"
        className="scroll-mt-[3.25rem] border-b border-white/[0.06] bg-gradient-to-b from-zinc-900/25 to-transparent"
      >
        <div className={`${shell} py-14 lg:py-16`}>
          <div className="max-w-2xl text-left">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Why this exists
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-zinc-50 sm:text-[1.65rem]">
              A single place for the people you actually need to reach.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Directory strips away the ceremony: you see who’s on file, you fix what’s wrong, and you
              move on. That’s the whole story.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Everything visible',
                body:
                  'One table, one truth—no hunting through cells or wondering if someone slipped through the cracks.',
              },
              {
                title: 'Friendly to mistakes',
                body:
                  'Duplicate emails get caught early. Edits stay draft until you save—so surprises are rare.',
              },
              {
                title: 'Feels finished',
                body:
                  'Polished surfaces and clear hierarchy so it feels like software you’d trust with real contacts.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/[0.06] bg-zinc-900/35 p-6 text-left shadow-sm shadow-black/20"
              >
                <h3 className="text-lg font-semibold text-zinc-100">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main id="workspace" className={`${shell} scroll-mt-[3.25rem] py-10 lg:py-14`}>
        <div className="mb-10 border-b border-white/[0.06] pb-10 text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Workspace
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
            Your directory
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Add people on the left, browse and manage on the right—the flow stays obvious from the first
            visit.
          </p>
        </div>

        {banner ? (
          <div
            role="status"
            className={[
              'mb-8 flex items-start justify-between gap-4 rounded-xl border px-4 py-3.5 text-sm leading-snug',
              banner.tone === 'success'
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100'
                : 'border-red-500/25 bg-red-500/10 text-red-100',
            ].join(' ')}
          >
            <p className="pt-0.5">{banner.text}</p>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-current/80 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Close
            </button>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-8 lg:col-span-2">
            <UserForm
              disabled={loading}
              onCreated={async () => {
                await refresh()
                setBanner({ tone: 'success', text: 'They’re in the directory now.' })
              }}
            />

            {editing ? (
              <EditUserForm
                key={editing.id}
                user={editing}
                disabled={loading}
                onCancel={() => setEditing(null)}
                onSaved={async () => {
                  await refresh()
                  setEditing(null)
                  setBanner({ tone: 'success', text: 'Their profile is up to date.' })
                }}
              />
            ) : (
              <div className="rounded-xl border border-white/[0.06] bg-zinc-900/35 px-5 py-5 text-left">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Quick tip
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Tap <span className="font-semibold text-zinc-200">Edit</span> on someone to update their
                  details—you can cancel anytime before saving.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <UserList
              users={users}
              loading={loading}
              editingId={editing?.id}
              onEdit={(user) => setEditing(user)}
              onDelete={(user) => void handleDelete(user)}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] bg-gradient-to-b from-black/40 to-zinc-950 pb-12 pt-14">
        <div className={`${shell}`}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-left">
              <p className="text-sm font-semibold tracking-tight text-zinc-100">Directory</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                People data that stays readable, editable, and calm—so you spend less time fighting your
                tools and more time using them.
              </p>
            </div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-600 md:text-right">
              © {new Date().getFullYear()} Directory
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
