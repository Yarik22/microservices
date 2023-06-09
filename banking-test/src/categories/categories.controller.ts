import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags("categories")
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly client: ClientProxy
  ) {}
  async onApplicationBootstrap() {
    await this.client.connect();
  }
  @ApiOperation({summary:"Add category"})
  @ApiResponse({type:Category})  
  @Post()
  create(@Body() data: CreateCategoryDto) {
    this.client.emit<Category>('add_category',data).subscribe();
  }

  // @ApiOperation({summary:"Get all categories"})
  // @ApiResponse({type:[Category]})
  // @Get()
  // findAll() {
  //   return this.categoriesService.getAllCategories();
  // }

  // @ApiOperation({summary:"Get category by id"})
  // @ApiResponse({type:Category})
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findCategoryById(+id);
  // }

  // @ApiOperation({summary:"Change category data by id"})
  // @ApiResponse({type:Category})
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
  //   return this.categoriesService.updateCategoryById(+id, data);
  // }

  // @ApiOperation({summary:"Delete category by id"})
  // @ApiResponse({type:Category})
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.categoriesService.deleteCategoryById(+id);
  // }
}
