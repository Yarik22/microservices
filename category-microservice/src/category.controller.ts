import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesService } from './category.service';
import { EventPattern } from '@nestjs/microservices';

@ApiTags("categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @EventPattern('add_category')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesService.addCategory(createCategoryDto);
    console.log(category)
    return category;
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
