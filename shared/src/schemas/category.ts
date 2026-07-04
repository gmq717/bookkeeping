import { z } from 'zod'

export const CategoryType = z.enum(['income', 'expense'])

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(32),
  icon: z.string().max(32).nullable(),
  parentId: z.number().nullable(),
  type: CategoryType,
  createdAt: z.string().datetime(),
})

export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(32),
  icon: z.string().max(32).optional(),
  parentId: z.number().nullable().optional(),
  type: CategoryType,
})

export const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(32).optional(),
  icon: z.string().max(32).optional(),
  parentId: z.number().nullable().optional(),
  type: CategoryType.optional(),
})

export type Category = z.infer<typeof CategorySchema>
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>
