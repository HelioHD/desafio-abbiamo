"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProducerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const order_producer_controller_1 = require("./order-producer.controller");
const order_producer_service_1 = require("./order-producer.service");
const mongoose_1 = require("@nestjs/mongoose");
let OrderProducerModule = class OrderProducerModule {
};
OrderProducerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            microservices_1.ClientsModule.register([
                {
                    name: 'order',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'order-producer',
                            brokers: ['127.0.0.1:9092'],
                        },
                        consumer: {
                            groupId: 'order-group',
                        },
                        producerOnlyMode: true,
                    },
                },
            ]),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/order', {}),
            mongoose_1.MongooseModule.forFeature([]),
        ],
        controllers: [order_producer_controller_1.OrderProducerController],
        providers: [order_producer_service_1.OrderProducerService],
    })
], OrderProducerModule);
exports.OrderProducerModule = OrderProducerModule;
//# sourceMappingURL=order-producer.module.js.map