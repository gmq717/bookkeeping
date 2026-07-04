import { z } from 'zod'

export const TransactionType = z.enum(['income', 'expense', 'transfer'])

export const TransactionSchema = z.object({
  id: z.number(),
  accountId: z.number(),
  categoryId: z.number(),
  amount: z.number(),
  type: TransactionType,
  note: z.string().max(256).nullable(),
  happenedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
})

export const CreateTransactionSchema = z.object({
  accountId: z.number(),
  categoryId: z.number(),
  amount: z.number().int(),
  type: TransactionType,
  note: z.string().max(256).optional(),
  happenedAt: z.string().datetime(),
})

export const UpdateTransactionSchema = z.object({
  accountId: z.number().optional(),
  categoryId: z.number().optional(),
  amount: z.number().int().optional(),
  type: TransactionType.optional(),
  note: z.string().max(256).optional(),
  happenedAt: z.string().datetime().optional(),
})

export type Transaction = z.infer<typeof TransactionSchema>
export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>
export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>
