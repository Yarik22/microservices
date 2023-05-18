import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { dataSourceOptions } from 'db/data-source';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot(dataSourceOptions
), BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
providers:[],
  controllers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource){}
}

