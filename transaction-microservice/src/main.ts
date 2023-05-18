import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TransactionsModule } from './transactons.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TransactionsModule, {
    transport: Transport.RMQ,
    options: { 
         urls: ['amqp://guest:guest@localhost:5672/banking'],
         queue: 'transactions',
         queueOptions: { 
            durable: false
           },
          },
  });
await app.listen();
}
bootstrap();