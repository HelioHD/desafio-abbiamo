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
exports.OrderProducerController = void 0;
const common_1 = require("@nestjs/common");
const orderRequest_dto_1 = require("./dto/orderRequest.dto");
const order_producer_service_1 = require("./order-producer.service");
let OrderProducerController = class OrderProducerController {
    constructor(orderProducerService) {
        this.orderProducerService = orderProducerService;
    }
    async createTimesheetRequest(createOrder, req) {
        try {
            common_1.Logger.debug('Recebida a requisição', 'order-producer', 'create', createOrder);
            common_1.Logger.debug('Recebida a requisição', 'order-producer', 'req', req);
            if (!createOrder.orderId || !createOrder.customerId || !createOrder.items || !createOrder.totalAmount || !createOrder.invoicedAt || !createOrder.createdAt) {
                throw new common_1.BadRequestException('Campos obrigatórios estão faltando');
            }
            const existingOrder = await this.orderProducerService.findOrderById(createOrder.orderId);
            if (existingOrder) {
                throw new common_1.BadRequestException('Já existe um pedido com o mesmo "orderId"');
            }
            if (isNaN(createOrder.totalAmount) || createOrder.totalAmount <= 0) {
                throw new common_1.BadRequestException('O "totalAmount" deve ser um número positivo');
            }
            const request = await this.orderProducerService.createOrder(createOrder);
            return request;
        }
        catch (error) {
            common_1.Logger.error('Erro ao criar sua ordem de produto', error);
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orderRequest_dto_1.CreateOrderRequestDto, Object]),
    __metadata("design:returntype", Promise)
], OrderProducerController.prototype, "createTimesheetRequest", null);
OrderProducerController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_producer_service_1.OrderProducerService])
], OrderProducerController);
exports.OrderProducerController = OrderProducerController;
//# sourceMappingURL=order-producer.controller.js.map