import { BadRequestException, Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderRequestDto } from './dto/orderRequest.dto'
import { OrderProducerService } from './order-producer.service';
import { Order } from 'order.schema';

@Controller('orders')
export class OrderProducerController {
  constructor(
    private readonly orderProducerService: OrderProducerService
  ) { }

  @Post()
  async createTimesheetRequest(@Body() createOrder: CreateOrderRequestDto, @Req() req: Request) {
    try {
      Logger.debug('Recebida a requisição', 'order-producer', 'create', createOrder);
      Logger.debug('Recebida a requisição', 'order-producer', 'req', req);

      if (!createOrder.orderId || !createOrder.customerId || !createOrder.items || !createOrder.totalAmount || !createOrder.invoicedAt || !createOrder.createdAt) {
        throw new BadRequestException('Campos obrigatórios estão faltando');
      }

      const existingOrder: Order = await this.orderProducerService.findOrderById(createOrder.orderId);
      if (existingOrder) {
        return {
          status: "error",
          message: "Order with the same orderId already exists"
        }
      }

      if (isNaN(createOrder.totalAmount) || createOrder.totalAmount <= 0) {
        return {
          status: "error",
          message: "The 'totalAmount' should be a positive number"
        }
      }

      const request = await this.orderProducerService.createOrder(createOrder);
      return request;
    } catch (error) {
      Logger.error('Erro ao criar sua ordem de produto', error);
      throw error;
    }
  }
}