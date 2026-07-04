import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateCategoryInput, UpdateCategoryInput } from 'shared'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({ include: { children: true } })
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { children: true },
    })
    if (!category) throw new NotFoundException('Category not found')
    return category
  }

  async create(input: CreateCategoryInput) {
    return this.prisma.category.create({ data: input })
  }

  async update(id: number, input: UpdateCategoryInput) {
    await this.findOne(id)
    return this.prisma.category.update({ where: { id }, data: input })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.category.delete({ where: { id } })
  }
}
