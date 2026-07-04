import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CreateCategorySchema, UpdateCategorySchema } from 'shared'
import { ZodPipe } from '../common/zod.pipe'
import { CategoryService } from './category.service'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one category' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(Number(id))
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  create(@Body(new ZodPipe(CreateCategorySchema)) body: unknown) {
    return this.categoryService.create(body as any)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(UpdateCategorySchema)) body: unknown,
  ) {
    return this.categoryService.update(Number(id), body as any)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(Number(id))
  }
}
