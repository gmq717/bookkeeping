import { api } from '../requests/request'
import type { Category, CreateCategoryInput, UpdateCategoryInput } from 'shared'

export const categoryService = {
  list: () => api.get<Category[]>('/api/bookkeeping/categories'),
  get: (id: number) => api.get<Category>(`/api/bookkeeping/categories/${id}`),
  create: (input: CreateCategoryInput) =>
    api.post<Category>('/api/bookkeeping/categories', input),
  update: (id: number, input: UpdateCategoryInput) =>
    api.patch<Category>(`/api/bookkeeping/categories/${id}`, input),
  remove: (id: number) =>
    api.delete<Category>(`/api/bookkeeping/categories/${id}`),
}
