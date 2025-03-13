import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({})
  method: string;

  @Prop({})
  url: string;

  @Prop({ type: Object })
  params: Object;

  @Prop({ type: Object })
  query: Object;

  @Prop({ type: Object })
  body: Object;

  @Prop({ type: Object })
  headers: Object;

  @Prop({ type: Number, default: undefined })
  statusCode: number | undefined;

  @Prop({})
  responseTime: string;

  @Prop({})
  timeStamp: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
