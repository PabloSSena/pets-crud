// producer.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/models/log.schema';
import { Consumer } from './consumer';
import { Producer } from './producer';

@Module({
  controllers: [Consumer],
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ClientsModule.register([
      {
        name: 'CRUD_PETS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'log',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [Producer],
  exports: [Producer],
})
export class ProducerModule {}
