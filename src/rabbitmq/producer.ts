import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Log } from 'src/models/log.schema';

@Injectable()
export class Producer {
  constructor(@Inject('CRUD_PETS') private rabbitClient: ClientProxy) {}

  produceMessage(data: Log) {
    this.rabbitClient.emit('log', data);
  }
}
