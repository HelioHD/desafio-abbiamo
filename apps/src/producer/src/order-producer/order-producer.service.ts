import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequestDto } from './dto/orderRequest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'order.schema';

@Injectable()
export class OrderProducerService {
  constructor(
    @Inject('order') private readonly client: ClientKafka,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) { }

  async onModuleInit() {
    await this.client.connect();
  }

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findOne({ orderId }).exec();
  }

  async createOrder(createOrderDto: CreateOrderRequestDto) {
    try {
      const orderProducerTopic = 'order-requests';
      const createdOrder = new this.orderModel(createOrderDto);
      await createdOrder.save();
      this.client.emit(orderProducerTopic, {
        value: createOrderDto,
      });
      if (createdOrder.orderId) {
        return {
          status: "success",
          message: "Order queued for processing"
        };
      }
    } catch (error) {
      Logger.error('Erro ao criar a ordem', error);
      throw error;
    }
  }
  async onModuleDestroy() {
    await this.client.close();
  }
}
