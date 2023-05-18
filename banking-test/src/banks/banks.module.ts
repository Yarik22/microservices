import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { Bank } from './entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [
    TypeOrmModule.forFeature([Bank]),
    ClientsModule.register([
      { 
        name: 'BANK_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/banks'],
          queue: 'banks',
          queueOptions: {
            durable: false
                },
          },
       },
     ]),
  ],
  exports:[BanksService]
})
export class BanksModule {}
