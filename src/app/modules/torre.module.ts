import { HttpModule, Module } from '@nestjs/common';
import { TorreClient } from 'src/client/torre.client';
import { TorreService } from 'src/core/services/torre.service';
import { LoggerModule } from 'src/domain/logger/logger.module';
import { TorreController } from '../controllers/torre.controller';

@Module({
  providers: [TorreService, TorreClient],
  imports: [LoggerModule, HttpModule],
  controllers: [TorreController]
})
export class TorreModule {}
