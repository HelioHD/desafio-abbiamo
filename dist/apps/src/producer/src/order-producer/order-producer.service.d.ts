/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequestDto } from './dto/orderRequest.dto';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'order.schema';
export declare class OrderProducerService {
    private configService;
    private readonly client;
    private orderModel;
    constructor(configService: ConfigService, client: ClientKafka, orderModel: Model<OrderDocument>);
    onModuleInit(): Promise<void>;
    findOrderById(orderId: string): Promise<import("mongoose").Document<unknown, {}, OrderDocument> & Order & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOrder(createOrderDto: CreateOrderRequestDto): Promise<void>;
    createOrderold(createOrderRequest: CreateOrderRequestDto): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    onModuleDestroy(): Promise<void>;
}
