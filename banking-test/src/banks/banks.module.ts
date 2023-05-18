import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [BanksController],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Bank]),
    ClientsModule.register([
      { 
        name: 'BANK_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/banking'],
          queue: 'banks',
          queueOptions: {
            durable: false
                },
          },
       },
     ]),
  ],
  exports:[]
})
export class BanksModule {}
