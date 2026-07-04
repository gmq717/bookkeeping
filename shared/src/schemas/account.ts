import { z } from 'zod'

export const AccountType = z.enum(['cash', 'bank', 'credit', 'investment'])

export const AccountSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(64),
  type: AccountType,
  balance: z.bigint(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
})

export const CreateAccountSchema = z.object({
  name: z.string().min(1).max(64),
  type: AccountType,
  balance: z.number().int().default(0),
})

export const UpdateAccountSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  type: AccountType.optional(),
})

export type Account = z.infer<typeof AccountSchema>
export type CreateAccountInput = z.infer<typeof CreateAccountSchema>
export type UpdateAccountInput = z.infer<typeof UpdateAccountSchema>
