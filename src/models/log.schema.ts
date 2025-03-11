import { Schema, SchemaFactory } from '@nestjs/mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  method: string;
  url: string;
  params: Object;
  query: Object;
  body: any;
  headers: Object;
  statusCode: number | undefined;
  responseTime: string;
  timeStamp: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
