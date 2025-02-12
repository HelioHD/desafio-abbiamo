import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTimesheetRequestDto } from './dto/create-timesheetRequest.dto';
export declare class OrderProducerService {
    private configService;
    private readonly client;
    constructor(configService: ConfigService, client: ClientKafka);
    onModuleInit(): Promise<void>;
    createTimesheetRequest(createTimesheetRequest: CreateTimesheetRequestDto): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    createTimeclockRequest(timeclockRequest: any, token: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
