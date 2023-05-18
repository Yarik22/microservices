import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { dataSourceOptions } from './data-source';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';
import { HttpModule } from '@nestjs/axios';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientsModule.register([
      { name: 'CATEGORY_SERVICE', transport: Transport.TCP },
     ]),
     TypeOrmModule.forFeature([Transaction,Category]),
     HttpModule,
  ],
  exports:[CategoriesService]
})
export class CategoriesModule {}
