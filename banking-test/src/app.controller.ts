import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './events/message.event';
@Controller()
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client:   ClientProxy) { }
  async onApplicationBootstrap() {
    await this.client.connect();
  }
  @Get()
  getHello() {
   this.client.emit<any>('message_printed', new Message('Hello World')).subscribe();
   return 'Hello World printed';
  }
}