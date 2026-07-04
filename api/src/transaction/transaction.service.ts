import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateTransactionInput, UpdateTransactionInput } from 'shared'

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.transaction.findMany({
      where: { deletedAt: null },
      include: { account: true, category: true },
      orderBy: { happenedAt: 'desc' },
    })
  }

  async findOne(id: number) {
    const t = await this.prisma.transaction.findFirst({
      where: { id, deletedAt: null },
      include: { account: true, category: true },
    })
    if (!t) throw new NotFoundException('Transaction not found')
    return t
  }

  async create(input: CreateTransactionInput) {
    return this.prisma.transaction.create({
      data: { ...input, amount: BigInt(input.amount) },
      include: { account: true, category: true },
    })
  }

  async update(id: number, input: UpdateTransactionInput) {
    await this.findOne(id)
    const data = { ...input }
    if (data.amount !== undefined) {
      data.amount = BigInt(data.amount) as any
    }
    return this.prisma.transaction.update({
      where: { id },
      data,
      include: { account: true, category: true },
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.transaction.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
