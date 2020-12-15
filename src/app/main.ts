import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '../config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '../domain/logger/logger.service';
import { ClassValidationException } from '../domain/exceptions/class-validation.exception';
import { HttpExceptionFilter } from '../domain/exceptions/http-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy, Response } from 'aws-serverless-express';

let cachedServer: Server;
let bootstrap;

if (process.env.NODE_ENV === 'local') {
  bootstrap = async () => {
    const logger: Logger = new Logger();

    const app = await NestFactory.create(AppModule, {
      logger,
      cors: true
    });
    const configService = app.get(ConfigService);
    app.useLogger(logger);
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const exception = new ClassValidationException(errors);
          logger.error(exception.toString());

          return exception;
        }
      })
    );

    app.enableCors();

    await app.listen(configService.port);
  };
  bootstrap();
} else {
  bootstrap = async () => {
    const expressApp = express();
    const logger: Logger = new Logger();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), {
      logger,
      cors: true
    });
    app.useLogger(logger);
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const exception = new ClassValidationException(errors);
          logger.error(exception.toString());

          return exception;
        }
      })
    );
    app.enableCors();

    await app.init();

    return createServer(expressApp);
  };
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
