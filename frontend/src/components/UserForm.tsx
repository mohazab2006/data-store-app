import { type FormEvent, useState } from 'react'
import type { User } from '../types/User'
import { createUser } from '../services/userService'

type Props = {
  disabled?: boolean
  onCreated: () => Promise<void> | void
}

export function UserForm({ disabled, onCreated }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (disabled || submitting) {
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
      await createUser(payload)
      setName('')
      setEmail('')
      setAge('')
      await onCreated()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6 shadow-sm shadow-black/20"
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">New entry</p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-blue-400">Welcome someone new</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Each email stays unique—you will be gently nudged if a duplicate slips in.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block text-left text-sm font-medium text-zinc-300">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none ring-0 ring-blue-500/0 transition placeholder:text-zinc-600 focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            placeholder="Ada Lovelace"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-zinc-300">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            placeholder="ada@example.com"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-zinc-300">
          Age
          <input
            type="number"
            name="age"
            min={1}
            step={1}
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-white/[0.08] bg-black/35 px-3 py-2.5 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-blue-500/70 focus:ring-4 focus:ring-blue-500/15 disabled:opacity-60"
            placeholder="36"
            required
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={disabled || submitting}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-900/40 transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Adding…' : 'Add to directory'}
        </button>
      </div>
    </form>
  )
}
