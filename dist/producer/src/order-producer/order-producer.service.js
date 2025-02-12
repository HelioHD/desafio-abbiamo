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
let OrderProducerService = class OrderProducerService {
    constructor(configService, client) {
        this.configService = configService;
        this.client = client;
    }
    async onModuleInit() {
        await this.client.connect();
    }
    async createTimesheetRequest(createTimesheetRequest) {
        let timesheetProducerTopic = "timesheet-requests";
        try {
            if (createTimesheetRequest.employeesId) {
                const uuId = (0, crypto_1.randomUUID)();
                common_1.Logger.verbose(`Mensagem enviada para o topico - ${timesheetProducerTopic}`);
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
    async createTimeclockRequest(timeclockRequest, token) {
        let puntuTimeclockTopic = "puntu-timeclock";
        try {
            timeclockRequest.requestReceivedAt = new Date();
            this.client.emit(puntuTimeclockTopic, {
                value: {
                    timeclock: timeclockRequest,
                    token: token
                }
            });
            common_1.Logger.verbose(`Mensagem enviada para o topico - ${puntuTimeclockTopic}`);
        }
        catch (err) {
            common_1.Logger.error("ERRO NO PRODUCER", err);
        }
    }
    async onModuleDestroy() {
        await this.client.close();
    }
};
OrderProducerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('puntu-timesheet-ms')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        microservices_1.ClientKafka])
], OrderProducerService);
exports.OrderProducerService = OrderProducerService;
//# sourceMappingURL=order-producer.service.js.map