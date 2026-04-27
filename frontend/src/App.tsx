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
    const timer = window.setTimeout(() => setBanner(null), 5200)
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
      setBanner({ tone: 'success', text: `${user.name} removed.` })
      await refresh()
    } catch (err) {
      setBanner({ tone: 'error', text: getApiErrorMessage(err) })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-[#1e3a8a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#3b82f6]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-[#f59e0b]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#1e40af]/10 blur-3xl"
      />

      <header className="relative border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-[#f8fafc]">
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 md:pb-16 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#3b82f6]">
            Full-stack · JDBC · REST
          </p>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-[#1e3a8a] md:text-5xl">
            Your records, kept simple.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            Add people, keep emails unique, edit in place. Built for clarity — no clutter, no noise,
            just a calm surface for your data.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#directory"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#1e40af] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1e40af]/20 transition hover:bg-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
            >
              Open directory
            </a>
            <span className="inline-flex items-center rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm">
              API base:{' '}
              <code className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-800">
                {import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}
              </code>
            </span>
          </div>
        </div>
      </header>

      <main id="directory" className="relative mx-auto max-w-5xl px-4 pb-16 pt-10 md:pt-12">
        {banner ? (
          <div
            role="status"
            className={[
              'mb-8 flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 text-sm shadow-sm',
              banner.tone === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                : 'border-red-200 bg-red-50 text-red-950',
            ].join(' ')}
          >
            <p className="pt-0.5">{banner.text}</p>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide text-current/80 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <UserForm
              disabled={loading}
              onCreated={async () => {
                await refresh()
                setBanner({ tone: 'success', text: 'User saved.' })
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
                  setBanner({ tone: 'success', text: 'Changes saved.' })
                }}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-left text-sm text-slate-600 shadow-sm shadow-slate-900/5">
                <p className="font-medium text-[#1e3a8a]">Tip</p>
                <p className="mt-2 leading-relaxed">
                  Select <span className="font-semibold text-slate-800">Edit</span> on a row to update
                  details in place. Cancel anytime — nothing changes until you save.
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

      <footer className="relative border-t border-slate-200/80 bg-white/70 py-10 text-center text-xs text-slate-500">
        Data Store · Spring Boot + MySQL + React
      </footer>
    </div>
  )
}
