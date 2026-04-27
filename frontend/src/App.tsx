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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className={`${shell} flex h-14 items-center justify-between border-b border-white/[0.06]`}>
        <span className="text-sm font-semibold tracking-tight text-zinc-100">Directory</span>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="#directory" className="cursor-pointer transition hover:text-zinc-300">
            Workspace
          </a>
          <span className="hidden text-zinc-700 sm:inline">·</span>
          <span className="hidden text-xs text-zinc-600 sm:inline">People · one surface</span>
        </div>
      </nav>

      <header className="border-b border-white/[0.06] bg-zinc-950">
        <div className={`${shell} pb-10 pt-10 lg:pb-12 lg:pt-12`}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-left">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                People directory
              </p>
              <h1 className="mt-5 max-w-xl text-pretty text-3xl font-semibold leading-[1.12] tracking-tight text-zinc-50 sm:text-4xl lg:text-[2.55rem] lg:leading-[1.08]">
                A calm place to keep contacts{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  crystal clear.
                </span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-[0.9375rem]">
                One screen for names, emails, and ages—edit when life updates, skim when you’re in a
                hurry.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#directory"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] shadow-blue-900/40 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Open workspace
                  <span aria-hidden="true" className="text-base leading-none">
                    →
                  </span>
                </a>
                <a
                  href="#directory"
                  className="cursor-pointer rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.06]"
                >
                  View table
                </a>
              </div>
            </div>

            <HeroCollage />
          </div>

          <div className="mt-10 grid gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
            {[
              ['Clarity', 'Typography and spacing tuned so scanning feels effortless.'],
              ['Control', 'Edits stay yours until you save—no surprises.'],
              ['Presence', 'Built to walk through live with confidence.'],
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

      <main id="directory" className={`${shell} py-10 lg:py-12`}>
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
                  Use <span className="font-semibold text-zinc-200">Edit</span> on a row to refine
                  someone—cancel anytime; nothing saves until you confirm.
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

      <footer className="border-t border-white/[0.06] bg-black/20 py-10">
        <div className={`${shell} text-center`}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Portfolio sample
          </p>
          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-zinc-500">
            Interface-first build—dark surfaces, sharp hierarchy, feedback that respects attention.
          </p>
          <p className="mt-8 text-[0.65rem] text-zinc-600">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
