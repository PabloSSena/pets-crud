import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Log } from 'src/models/log.schema';
import { Producer } from 'src/rabbitmq/producer';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  /**
   *
   */
  constructor(private readonly rabbitmqProduce: Producer) {}
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;

      const requestData: Log = {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        statusCode: req.statusCode,
        responseTime: `${duration}ms`,
        timeStamp: new Date().toISOString(),
      };
      this.rabbitmqProduce.produceMessage(requestData);
    });
    next();
  }
}
