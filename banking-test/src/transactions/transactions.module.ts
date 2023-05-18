import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { Bank } from 'src/banks/entities/bank.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TransactionsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: 'TRANSACTION_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/banking'],
          queue: 'transactions',
          queueOptions: {
            durable: false
                },
          },
       },
     ]),
    TypeOrmModule.forFeature([Transaction,Category,Bank]),
    HttpModule,
    CategoriesModule,
  ],
  exports:[]
})
export class TransactionsModule {}
