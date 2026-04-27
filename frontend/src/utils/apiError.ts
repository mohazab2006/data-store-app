import axios from 'axios'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "We can't reach the directory right now. Refresh in a moment, or confirm everything is running."
    }

    const body = error.response.data as { message?: string } | undefined
    if (body?.message && typeof body.message === 'string') {
      return body.message
    }

    const status = error.response.status
    if (status === 404) {
      return "That entry is no longer here."
    }
    if (status === 409) {
      return 'That email is already in use—try another.'
    }
    if (status >= 500) {
      return 'Something went wrong while saving. Please try again.'
    }

    return 'Something went wrong. Please try again.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong.'
}
