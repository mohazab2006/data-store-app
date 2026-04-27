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
      className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-900/5"
    >
      <h2 className="text-lg font-semibold tracking-tight text-[#1e3a8a]">Add someone</h2>
      <p className="mt-1 text-sm text-slate-600">Emails must be unique. Ages must be positive.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block text-left text-sm font-medium text-slate-700">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2.5 text-slate-900 outline-none ring-[#1e40af]/0 transition focus:border-[#3b82f6] focus:bg-white focus:ring-4 focus:ring-[#3b82f6]/15 disabled:opacity-60"
            placeholder="Ada Lovelace"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#3b82f6] focus:bg-white focus:ring-4 focus:ring-[#3b82f6]/15 disabled:opacity-60"
            placeholder="ada@example.com"
            required
          />
        </label>

        <label className="block text-left text-sm font-medium text-slate-700">
          Age
          <input
            type="number"
            name="age"
            min={1}
            step={1}
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
            disabled={disabled || submitting}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#3b82f6] focus:bg-white focus:ring-4 focus:ring-[#3b82f6]/15 disabled:opacity-60"
            placeholder="36"
            required
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={disabled || submitting}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#1e40af] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#1e40af]/20 transition hover:bg-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Add user'}
        </button>
      </div>
    </form>
  )
}
