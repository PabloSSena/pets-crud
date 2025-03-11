import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from 'src/models/log.schema';

@Controller()
export class Consumer {
  /**
   *
   */
  constructor(@InjectModel(Log.name) private LogModel: Model<LogDocument>) {}
  @EventPattern('log')
  handleLog(@Payload() data) {
    const log = new this.LogModel(data);
    return log.save();
  }
}
