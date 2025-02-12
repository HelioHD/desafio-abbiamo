import { CreateTimesheetRequestDto } from './dto/create-timesheetRequest.dto';
import { OrderProducerService } from './order-producer.service';
export declare class OrderProducerController {
    private readonly orderProducerService;
    constructor(orderProducerService: OrderProducerService);
    createTimesheetRequest(createOrder: CreateTimesheetRequestDto, req: Request): Promise<`${string}-${string}-${string}-${string}-${string}`>;
}
