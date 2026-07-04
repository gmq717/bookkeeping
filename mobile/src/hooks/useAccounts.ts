import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountService } from '../services/account'
import type { CreateAccountInput, UpdateAccountInput } from 'shared'

const KEY = 'accounts'

export function useAccounts() {
  return useQuery({ queryKey: [KEY], queryFn: accountService.list })
}

export function useCreateAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateAccountInput) => accountService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateAccountInput }) =>
      accountService.update(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteAccount() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => accountService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
