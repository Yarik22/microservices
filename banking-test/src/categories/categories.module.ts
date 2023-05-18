import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [CategoriesController],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Category]),
    ClientsModule.register([
      { 
        name: 'CATEGORY_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672/banking'],
          queue: 'categories',
          queueOptions: {
            durable: false
                },
          },
       },
     ]),
  ],
  exports:[]
})
export class CategoriesModule {}
