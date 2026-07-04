import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../services/category'
import type { CreateCategoryInput, UpdateCategoryInput } from 'shared'

const KEY = 'categories'

export function useCategories() {
  return useQuery({ queryKey: [KEY], queryFn: categoryService.list })
}

export function useCreateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateCategoryInput) => categoryService.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useUpdateCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateCategoryInput }) =>
      categoryService.update(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}

export function useDeleteCategory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => categoryService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  })
}
