import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
