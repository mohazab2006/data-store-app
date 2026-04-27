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
    <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Directory
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#1e3a8a]">Everyone in view</h2>
          <p className="mt-2 text-sm text-slate-600">
            {loading ? 'Gathering your list…' : `${users.length} ${users.length === 1 ? 'person' : 'people'} on file`}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-slate-600">
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
          <tbody className="divide-y divide-slate-100 bg-white">
            {!loading && users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-600">
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
                      active ? 'bg-blue-50/70' : 'hover:bg-slate-50/80',
                    ].join(' ')}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">{u.name}</td>
                    <td className="px-4 py-3 text-slate-700">{u.email}</td>
                    <td className="px-4 py-3 text-slate-700">{u.age}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(u)}
                          disabled={loading || u.id == null}
                          className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#1e40af] transition hover:border-[#93c5fd] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] disabled:cursor-not-allowed disabled:opacity-60"
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
                          className="cursor-pointer rounded-lg border border-red-100 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-200 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60"
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
