import { Module } from '@nestjs/common';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { dataSourceOptions } from './data-source';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Bank,Transaction,Category]),
    ClientsModule.register([
      { name: 'TRANSACTION_SERVICE', transport: Transport.TCP },
     ]),
     HttpModule,
  ],
  exports:[TransactionsService]
})
export class TransactionsModule {}
