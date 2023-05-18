import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository:Repository<Transaction>,
    @InjectRepository(Bank) private readonly bankRepository:Repository<Bank>,
    @InjectRepository(Category) private readonly categoryRepository:Repository<Bank>
  ){}

  async findBankByName(name:string):Promise<Bank>{
    return await this.bankRepository.findOne({where:{name}})
  }

  async changeBalanceOfBank(bankName:string,newBalance:number):Promise<Bank>{
    const bank = await this.findBankByName(bankName)
    bank.balance=newBalance
    return await this.bankRepository.save(bank)
  }

  async findAllCategoriesByNames(names: string[]): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.transactions', 'transaction')
      .where('category.name IN (:...names)', { names })
      .getMany();
      if(!categories.length){
        throw new HttpException("No such categories",HttpStatus.NOT_FOUND)
      }
    return categories;
  }

  async createTransaction(data: CreateTransactionDto) {
    const categories= await this.findAllCategoriesByNames(data.categories)
    const bank=await this.findBankByName(data.bankName)
    if(!bank){
      throw new HttpException("No such bank",HttpStatus.NOT_FOUND)
    }
    if(categories.length!=data.categories.length){
      const extraCategories=data.categories.filter((element) => !categories.map(val=>val.name).includes(element))
      throw new HttpException(`No such categories: ${extraCategories}`,HttpStatus.NOT_FOUND)
    }
    const newBalance=bank.balance+data.amount
    await this.changeBalanceOfBank(bank.name,newBalance)
    const candidate = this.transactionRepository.create({...data,categories,bank})
    return await this.transactionRepository.save(candidate)
  }
  
  // async getPaginatedTransations(queryData:PaginationDto):Promise<[Transaction[], number]>{
  // const { page, limit } = queryData;
  // const [transactions, total] = await this.transactionRepository.findAndCount({
  //   order:{
  //     id:"ASC"
  //   },
  //   take: limit,
  //   skip: (page-1)*limit
  // ,relations:["categories", "bank"]})
  // if(!transactions.length||limit>total){
  //   return await this.transactionRepository.findAndCount({
  //     order:{
  //       id:"ASC"
  //     },
  //     take: total,
  //   relations:["categories", "bank"]})
  // }
  // return [transactions, total]
  // }

  // async deleteTransactionById(id: number) {
  //   const transaction = await this.transactionRepository.findOne({where:{id},relations:["bank"]})
  //   if(!transaction){
  //     throw new HttpException("Transaction is not found",HttpStatus.NOT_FOUND)
  //   }
  //   await this.transactionRepository.delete(id)
  //   const newBalance=transaction.bank.balance-transaction.amount
  //   transaction.bank.balance-=transaction.amount
  //   await this.banksService.changeBalanceOfBank(transaction.bank.name,newBalance)
  //   return transaction
  //   }
}
