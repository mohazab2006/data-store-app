import { useCallback, useEffect, useState } from 'react'
import { EditUserForm } from './components/EditUserForm'
import { UserForm } from './components/UserForm'
import { UserList } from './components/UserList'
import { deleteUser, getUsers } from './services/userService'
import type { User } from './types/User'
import { getApiErrorMessage } from './utils/apiError'

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
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-[#1e3a8a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#3b82f6]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-[#f59e0b]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#1e40af]/8 blur-3xl"
      />

      <header className="relative border-b border-slate-200/70 bg-gradient-to-b from-white via-[#fafbff] to-[#f8fafc]">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-20 sm:pb-20 sm:pt-24 md:pb-24 md:pt-28">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            People directory
          </p>

          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-center text-[2rem] font-semibold leading-[1.15] tracking-tight text-[#0f172a] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            The people who matter—
            <span className="text-[#1e40af]">organized in one calm view.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-center text-[1.0625rem] leading-relaxed text-slate-600 md:text-lg md:leading-relaxed">
            Hold names, emails, and moments in age as a lightweight record you can revisit and
            refine—whether you are managing a volunteer list, a cohort, or a circle of clients.
          </p>

          <div className="mx-auto mt-11 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-5 text-center text-sm text-slate-600">
            <div>
              <p className="font-semibold text-[#1e3a8a]">Thoughtful rhythm</p>
              <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-[0.8125rem]">
                Fewer distractions, clearer next steps.
              </p>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1e3a8a]">Room to evolve</p>
              <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-[0.8125rem]">
                Edit when details change—nothing edits itself.
              </p>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden="true" />
            <div>
              <p className="font-semibold text-[#1e3a8a]">Built to present</p>
              <p className="mt-1 text-xs leading-snug text-slate-500 sm:text-[0.8125rem]">
                Polished surface you can walk through live.
              </p>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="#directory"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#1e40af] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_rgba(30,64,175,0.55)] transition duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_16px_44px_-12px_rgba(30,64,175,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] motion-safe:active:translate-y-[1px]"
            >
              Open the directory
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center text-xs leading-relaxed text-slate-500">
            Built for live walkthroughs: generous type, responsive layout, and feedback that feels
            human when something lands—or needs a second try.
          </p>
        </div>
      </header>

      <main id="directory" className="relative mx-auto max-w-5xl px-5 pb-20 pt-12 md:pt-16">
        {banner ? (
          <div
            role="status"
            className={[
              'mb-10 flex items-start justify-between gap-4 rounded-2xl border px-5 py-4 text-sm leading-snug shadow-sm',
              banner.tone === 'success'
                ? 'border-emerald-200/90 bg-emerald-50/90 text-emerald-950'
                : 'border-red-200/90 bg-red-50/90 text-red-950',
            ].join(' ')}
          >
            <p className="pt-0.5">{banner.text}</p>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="shrink-0 cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-current/75 hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Close
            </button>
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-10 lg:col-span-2">
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
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-7 text-left shadow-sm shadow-slate-900/[0.03] backdrop-blur-sm">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  How it works
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Choose <span className="font-semibold text-slate-800">Edit</span> beside someone in
                  the table to adjust their details. Cancel anytime—updates apply only when you save.
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

      <footer className="relative border-t border-slate-200/70 bg-white/80 py-12">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Portfolio sample
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
            Crafted to show product thinking: hierarchy, restraint, and responses that respect the
            person using the screen.
          </p>
          <p className="mt-8 text-[0.7rem] text-slate-400">
            © {new Date().getFullYear()} · Demonstration interface
          </p>
        </div>
      </footer>
    </div>
  )
}
