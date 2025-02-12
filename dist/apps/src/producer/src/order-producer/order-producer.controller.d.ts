import { Request } from 'express';
import { CreateOrderRequestDto } from './dto/orderRequest.dto';
import { OrderProducerService } from './order-producer.service';
export declare class OrderProducerController {
    private readonly orderProducerService;
    constructor(orderProducerService: OrderProducerService);
    createTimesheetRequest(createOrder: CreateOrderRequestDto, req: Request): Promise<void>;
}
