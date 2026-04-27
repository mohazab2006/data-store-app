import type { User } from '../types/User'

type Props = {
  users: User[]
  loading?: boolean
  editingId?: number | null
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UserList({ users, loading, editingId, onEdit, onDelete }: Props) {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6 shadow-sm shadow-black/20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Directory
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-blue-400">Everyone in view</h2>
          <p className="mt-2 text-sm text-zinc-400">
            {loading ? 'Gathering your list…' : `${users.length} ${users.length === 1 ? 'person' : 'people'} on file`}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06]">
        <table className="min-w-full divide-y divide-white/[0.06] text-left text-sm">
          <thead className="bg-zinc-900/90 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Age
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] bg-zinc-950/40">
            {!loading && users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-zinc-400">
                  Your directory is ready—add the first person from the left when you are.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const active = u.id === editingId
                return (
                  <tr
                    key={u.id ?? u.email}
                    className={[
                      'transition-colors',
                      active ? 'bg-blue-500/10' : 'hover:bg-white/[0.03]',
                    ].join(' ')}
                  >
                    <td className="px-4 py-3 font-medium text-zinc-100">{u.name}</td>
                    <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                    <td className="px-4 py-3 tabular-nums text-zinc-400">{u.age}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(u)}
                          disabled={loading || u.id == null}
                          className="cursor-pointer rounded-lg border border-blue-500/35 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 transition hover:border-blue-400/50 hover:bg-blue-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              u.id != null &&
                              window.confirm(`Delete ${u.name}? This cannot be undone.`)
                            ) {
                              onDelete(u)
                            }
                          }}
                          disabled={loading || u.id == null}
                          className="cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:border-red-400/40 hover:bg-red-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
