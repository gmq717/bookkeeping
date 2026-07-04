import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CreateTransactionSchema, UpdateTransactionSchema } from 'shared'
import { ZodPipe } from '../common/zod.pipe'
import { TransactionService } from './transaction.service'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'List all transactions' })
  findAll() {
    return this.transactionService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one transaction' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(Number(id))
  }

  @Post()
  @ApiOperation({ summary: 'Create a transaction' })
  create(@Body(new ZodPipe(CreateTransactionSchema)) body: unknown) {
    return this.transactionService.create(body as any)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(UpdateTransactionSchema)) body: unknown,
  ) {
    return this.transactionService.update(Number(id), body as any)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a transaction' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(Number(id))
  }
}
