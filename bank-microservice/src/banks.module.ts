import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { dataSourceOptions } from './data-source';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Bank,Transaction,Category]),
    ClientsModule.register([
      { name: 'BANK_SERVICE', transport: Transport.TCP },
     ]),
  ],
  exports:[BanksService]
})
export class BanksModule {}
