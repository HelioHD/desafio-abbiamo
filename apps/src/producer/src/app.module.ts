import { Module } from '@nestjs/common';
import { OrderProducerModule } from 'apps/src/producer/src/order-producer/order-producer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [OrderProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
