import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CategoriesModule } from './category.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CategoriesModule, {
    transport: Transport.RMQ,
    options: { 
         urls: ['amqp://guest:guest@localhost:5672/banking'],
         queue: 'categories',
         queueOptions: { 
            durable: false
           },
          },
  });
await app.listen();
}
bootstrap();