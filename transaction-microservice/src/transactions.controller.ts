import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Transaction } from './entities/transaction.entity';
import { EventPattern } from '@nestjs/microservices';

@ApiTags("transactions")
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    ) {}

  // @ApiOperation({summary:"Get paginated transactions"})
  // @ApiResponse({type:[Transaction]})  
  // @Get()
  // async findAll(@Query()query:PaginationDto) {
  //   const [transactions, total] = await this.transactionsService.getPaginatedTransations(query)
  //   return {
  //     data: transactions,
  //     meta: {
  //         total,
  //         limit:transactions.length,
  //     },
  //   }
  // }
  
  @EventPattern('add_transaction')
  @Post() 
  async createOrder(@Body() data:CreateTransactionDto) { 
    const transaction =  await this.transactionsService.createTransaction(data); 
    console.log(transaction) 
    return {...transaction,categories:data.categories}
  } 

  // @ApiOperation({summary:"Delete transaction by id"})
  // @ApiResponse({type:Transaction}) 
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.transactionsService.deleteTransactionById(+id);
  // }
}
