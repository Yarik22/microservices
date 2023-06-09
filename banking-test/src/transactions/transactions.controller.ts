import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Inject } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PaginationDto } from './dto/pagination.dto';
import { HttpService } from '@nestjs/axios';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Transaction } from './entities/transaction.entity';
import { ApiKeyGuard } from 'src/guards/apikey.guard';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags("transactions")
@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly client: ClientProxy
    ) { }
  async onApplicationBootstrap() {
    await this.client.connect();
  }
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
  
  @ApiOperation({summary:"Add transaction"})
  @ApiResponse({type:Transaction})
  @Post() 
  async createOrder(@Body() data:CreateTransactionDto) { 
    this.client.emit<Transaction>('add_transaction',data).subscribe();
  } 

  // @ApiOperation({summary:"Delete transaction by id"})
  // @ApiResponse({type:Transaction}) 
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.transactionsService.deleteTransactionById(+id);
  // }
}
