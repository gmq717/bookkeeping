import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateAccountInput, UpdateAccountInput } from 'shared'

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.account.findMany({ where: { deletedAt: null } })
  }

  async findOne(id: number) {
    const account = await this.prisma.account.findFirst({
      where: { id, deletedAt: null },
    })
    if (!account) throw new NotFoundException('Account not found')
    return account
  }

  async create(input: CreateAccountInput) {
    return this.prisma.account.create({
      data: { ...input, balance: BigInt(input.balance) },
    })
  }

  async update(id: number, input: UpdateAccountInput) {
    await this.findOne(id)
    return this.prisma.account.update({ where: { id }, data: input })
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prisma.account.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}
