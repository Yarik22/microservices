import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = process.env.PORT || 7000
  const app = await NestFactory.create(AppModule,{
    // logger: new LoggerGo(),
  });
  // app.useLogger(new LoggerGo())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  )
  await app.listen(PORT,()=>console.log("Server started on port", PORT))
}
bootstrap()
