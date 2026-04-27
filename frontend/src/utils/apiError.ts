import axios from 'axios'

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as { message?: string } | undefined
    if (body?.message) {
      return body.message
    }
    if (error.response?.statusText) {
      return `${error.response.status} ${error.response.statusText}`
    }
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong.'
}
