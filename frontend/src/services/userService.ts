import type { User } from '../types/User'
import { api } from './apiClient'

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users')
  return data
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`)
  return data
}

export async function createUser(payload: Omit<User, 'id'>): Promise<User> {
  const { data } = await api.post<User>('/users', payload)
  return data
}

export async function updateUser(id: number, payload: Omit<User, 'id'>): Promise<User> {
  const { data } = await api.put<User>(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}
