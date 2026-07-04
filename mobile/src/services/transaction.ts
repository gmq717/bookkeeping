import { api } from '../requests/request'
import type {
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
} from 'shared'

export const transactionService = {
  list: () => api.get<Transaction[]>('/api/bookkeeping/transactions'),
  get: (id: number) =>
    api.get<Transaction>(`/api/bookkeeping/transactions/${id}`),
  create: (input: CreateTransactionInput) =>
    api.post<Transaction>('/api/bookkeeping/transactions', input),
  update: (id: number, input: UpdateTransactionInput) =>
    api.patch<Transaction>(`/api/bookkeeping/transactions/${id}`, input),
  remove: (id: number) =>
    api.delete<Transaction>(`/api/bookkeeping/transactions/${id}`),
}
