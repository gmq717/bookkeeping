import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CreateAccountSchema, UpdateAccountSchema } from 'shared'
import { ZodPipe } from '../common/zod.pipe'
import { AccountService } from './account.service'

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiOperation({ summary: 'List all accounts' })
  findAll() {
    return this.accountService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one account' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(Number(id))
  }

  @Post()
  @ApiOperation({ summary: 'Create an account' })
  create(@Body(new ZodPipe(CreateAccountSchema)) body: unknown) {
    return this.accountService.create(body as any)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account' })
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(UpdateAccountSchema)) body: unknown,
  ) {
    return this.accountService.update(Number(id), body as any)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an account' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(Number(id))
  }
}
