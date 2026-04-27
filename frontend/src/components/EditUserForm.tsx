import { type FormEvent, useState } from 'react'
import type { User } from '../types/User'
import { updateUser } from '../services/userService'

type Props = {
  user: User
  disabled?: boolean
  onSaved: () => Promise<void> | void
  onCancel: () => void
}

export function EditUserForm({ user, disabled, onSaved, onCancel }: Props) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [age, setAge] = useState(String(user.age))
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user.id || disabled || submitting) {
      return
    }
    const parsedAge = Number.parseInt(age, 10)
    if (!name.trim() || !email.trim() || Number.isNaN(parsedAge) || parsedAge <= 0) {
      return
    }

    const payload: Omit<User, 'id'> = {
      name: name.trim(),
      email: email.trim(),
      age: parsedAge,
    }

    setSubmitting(true)
    try {
      await updateUser(user.id, payload)
      await onSaved()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-500/25 bg-gradient-to-br from-zinc-900/90 to-blue-950/35 p-6 shadow-sm shadow-black/25"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-blue-400/80">
            Refine
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-blue-400">Adjust their details</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Updating <span className="font-medium text-zinc-200">{user.name}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="cursor-pointer rounded-xl border border-white/[0.1] bg-zinc-950/60 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/15 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block text-left text-sm font-medium text-zinc-300">
          Name
          <input
            type="text"
            name="edit-name"
            autoComplete="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-zinc-300">
          Email
          <input
            type="email"
            name="edit-email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-zinc-300">
          Age
          <input
            type="number"
            name="edit-age"
            min={1}
            step={1}
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            required
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="submit"
          disabled={disabled || submitting}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-900/35 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save updates'}
        </button>
      </div>
    </form>
  )
}
