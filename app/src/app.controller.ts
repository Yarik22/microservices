import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Inject} from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { ClientProxy } from '@nestjs/microservices';
@Controller('banks')
export class AppController {
  constructor(@Inject('BANK_SERVICE') private readonly client:   ClientProxy,) { }
  async onApplicationBootstrap() {
    await this.client.connect();
  }
  @Post()
  async create(@Body() data: CreateBankDto) {
    console.log(data)
    const bank = this.client.emit<any>('add_bank',data).subscribe();
    console.log(bank)
    return bank;
  }
}