import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [TransactionsModule, CategoriesModule,
    TypeOrmModule.forFeature([Category]),]
})
export class StatisticsModule {}
