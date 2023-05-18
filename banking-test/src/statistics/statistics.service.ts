import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionAmountStatisticDto } from './dto/transaction-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository:Repository<Category>
    ){}

    async findAllCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
        const categories = await this.categoryRepository
          .createQueryBuilder('category')
          .leftJoinAndSelect('category.transactions', 'transaction')
          .whereInIds(categoryIds)
          .getMany();
          if(!categories.length){
            throw new HttpException("No such categories",HttpStatus.NOT_FOUND)
          }
        return categories;
      }
      
    async getTotalAmountOfCategories(data:TransactionAmountStatisticDto){
        const categories = await this.findAllCategoriesByIds(data.categoryIds)

        const transactionsArray = categories
        .map(category=> category.transactions
            .filter(transaction=>transaction.createdAt>=data.fromPeriod&&transaction.createdAt<=data.toPeriod))

        const categoryNames = categories
        .map(category=> category.name)

        const transactionAmounts=transactionsArray
        .map(transactions=> transactions
            .map(transaction=>transaction.amount)
            .reduce((acc,amount)=>acc+=amount,0))

        const result = categoryNames.reduce((acc, curr, index) => {
            acc[curr] = transactionAmounts[index];
            return acc;
        }, {});

        return result
    }
}
