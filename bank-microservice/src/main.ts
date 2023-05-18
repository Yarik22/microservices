import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BanksModule } from './banks.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BanksModule, {
    transport: Transport.RMQ,
    options: { 
         urls: ['amqp://guest:guest@localhost:5672/banks'],
         queue: 'banks',
         queueOptions: { 
            durable: false
           },
          },
  });
await app.listen();
}
bootstrap();