import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Inject} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
@ApiTags("banks")
@Controller('banks')
export class BanksController {
  constructor(
    @Inject('BANK_SERVICE') private readonly client: ClientProxy
    ) { }
  async onApplicationBootstrap() {
    await this.client.connect();
  }
  @ApiOperation({summary:"Add bank"})
  @ApiResponse({type:Bank})  
  @Post()
  async create(@Body() data: CreateBankDto) {
    this.client.emit<Bank>('add_bank',data).subscribe();
  }

  // @ApiOperation({summary:"Get all banks"})
  // @ApiResponse({type:[Bank]})  
  // @Get()
  // findAll() {
  //   return this.banksService.getAllBanks();
  // }

  // @ApiOperation({summary:"Get bank by id"})
  // @ApiResponse({type:Bank})  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.banksService.findBankById(+id);
  // }

  // @ApiOperation({summary:"Change bank data by id"})
  // @ApiResponse({type:Bank})  
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: UpdateBankDto) {
  //   return this.banksService.updateBankById(+id, data);
  // }

  // @ApiOperation({summary:"Delete bank by id"})
  // @ApiResponse({type:Bank})  
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.banksService.deleteBankById(+id);
  // }

  // @ApiOperation({ summary: "Upload File" })
  // @ApiResponse({ type: Bank })
  // @Post(':id/upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log('test')
  //   return this.banksService.uploadFile(file);

  // }

}
