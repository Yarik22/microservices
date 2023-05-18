import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksModule } from './banks/banks.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    ClientsModule.register([
      { 
        name: 'HELLO_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/hello'],
          queue: 'hello',
          queueOptions: {
            durable: false
                },
          },
       },
     ]),
    TypeOrmModule.forRoot(dataSourceOptions
), BanksModule, CategoriesModule, TransactionsModule, StatisticsModule],
providers:[],
  controllers: [AppController],
})
export class AppModule {
  // constructor(private dataSource: DataSource){}
}

