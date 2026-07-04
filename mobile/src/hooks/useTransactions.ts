import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../services/transaction'
import type { CreateTransactionInput, UpdateTransactionInput } from 'shared'

const KEY = 'transactions'

export function useTransactions() {
  return useQuery({ queryKey: [KEY], queryFn: transactionService.list })
}

export function useCreateTransaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateTransactionInput) =>
      transactionService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateTransaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: number
      input: UpdateTransactionInput
    }) => transactionService.update(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteTransaction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => transactionService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
