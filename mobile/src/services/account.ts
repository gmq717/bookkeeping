import { api } from '../requests/request'
import type { Account, CreateAccountInput, UpdateAccountInput } from 'shared'

export const accountService = {
  list: () => api.get<Account[]>('/api/bookkeeping/accounts'),
  get: (id: number) => api.get<Account>(`/api/bookkeeping/accounts/${id}`),
  create: (input: CreateAccountInput) =>
    api.post<Account>('/api/bookkeeping/accounts', input),
  update: (id: number, input: UpdateAccountInput) =>
    api.patch<Account>(`/api/bookkeeping/accounts/${id}`, input),
  remove: (id: number) =>
    api.delete<Account>(`/api/bookkeeping/accounts/${id}`),
}
