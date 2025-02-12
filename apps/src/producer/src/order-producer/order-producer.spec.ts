import { Test, TestingModule } from '@nestjs/testing';
import { OrderProducerController } from './order-producer.controller';
import { OrderProducerService } from './order-producer.service';


describe('OrderProducerService', () => {
  let orderProducerService: OrderProducerService;
  let orderModelMock: any;

  beforeEach(async () => {

    orderModelMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderProducerController],
      imports: [],
      providers: [
        OrderProducerService,
        // { provide: getModelToken(Order.name), useValue: {} },
        { provide: 'order-producer', useValue: {} },
        OrderProducerController,
      ],
    }).compile();

    orderProducerService = app.get<OrderProducerService>(OrderProducerService);
  });

  describe('Testes das funções de cadastro', () => {
    it('espero que crie a ordem do produto', async () => {
      const createOrderDto = {
        orderId: '123456',
        customerId: '67890',
        items: [
          {
            itemId: '9876',
            quantity: 2,
          },
          {
            itemId: '5432',
            quantity: 1,
          },
        ],
        totalAmount: 150.00,
        invoicedAt: new Date('2025-01-28T10:00:00Z'),
        createdAt: new Date('2025-01-28T10:00:00Z'),
      };
      const result = await orderProducerService.createOrder(createOrderDto)
      expect(result.status).toBe(201);
    });

    it('Espero que encontre pelo ID', async () => {
      const orderId = '123456';
      const order = { orderId };
      orderModelMock.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      const result = await orderProducerService.findOrderById(orderId);
      expect(result).toEqual(order);
      expect(orderModelMock.findOne).toHaveBeenCalledWith({ orderId });
    });

    it('Deve me retornar error', async () => {
      const createOrderDto = {
        orderId: '158456',
        customerId: '67890',
        items: [
          {
            itemId: '9876',
            quantity: 2,
          },
          {
            itemId: '5432',
            quantity: 1,
          },
        ],
        totalAmount: 150.00,
        invoicedAt: new Date('2025-01-28T10:00:00Z'),
        createdAt: new Date('2025-01-28T10:00:00Z'),
      };
      const error = new Error('Criação de ordem falhou');
      orderModelMock.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await expect(orderProducerService.createOrder(createOrderDto)).rejects.toThrow(error);
    });

  });
})
