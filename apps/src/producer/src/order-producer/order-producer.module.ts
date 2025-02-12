import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderProducerController } from './order-producer.controller';
import { OrderProducerService } from './order-producer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'order',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-producer',
            brokers: ['127.0.0.1:29092'],
          },
          consumer: {
            groupId: 'order-group',
          },
          producerOnlyMode: true,
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/order'),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [OrderProducerController],
  providers: [OrderProducerService],
})
export class OrderProducerModule { }