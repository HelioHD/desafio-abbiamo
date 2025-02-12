"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProducerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const crypto_1 = require("crypto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("order.schema");
let OrderProducerService = class OrderProducerService {
    constructor(configService, client, orderModel) {
        this.configService = configService;
        this.client = client;
        this.orderModel = orderModel;
    }
    async onModuleInit() {
        await this.client.connect();
    }
    async findOrderById(orderId) {
        return await this.orderModel.findOne({ orderId }).exec();
    }
    async createOrder(createOrderDto) {
        try {
            let timesheetProducerTopic = "order-requests";
            if (createOrderDto) {
                const createdOrder = new this.orderModel(createOrderDto);
                await createdOrder.save();
                const ret = this.client.emit(timesheetProducerTopic, {
                    value: createOrderDto
                });
            }
        }
        catch (error) {
        }
    }
    async createOrderold(createOrderRequest) {
        try {
            if (createOrderRequest) {
                const uuId = (0, crypto_1.randomUUID)();
                common_1.Logger.verbose(`Mensagem enviada para fila - ${uuId}`);
                return uuId;
            }
            else {
                common_1.Logger.error("Não foi informado algum dado na requisição por favor verifique se está tudo correto!");
            }
        }
        catch (err) {
            this.client.emit("error-logs", { value: "timesheetProducer: " + err });
            common_1.Logger.error("Error ao salvar a requisição por favor verifique 'error-logs': ", err);
        }
    }
    async onModuleDestroy() {
        await this.client.close();
    }
};
OrderProducerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('order-producer')),
    __param(2, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        microservices_1.ClientKafka,
        mongoose_2.Model])
], OrderProducerService);
exports.OrderProducerService = OrderProducerService;
//# sourceMappingURL=order-producer.service.js.map