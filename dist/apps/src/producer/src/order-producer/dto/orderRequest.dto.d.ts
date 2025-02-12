declare class OrderItemDto {
    itemId: string;
    quantity: number;
}
export declare class CreateOrderRequestDto {
    orderId: string;
    customerId: string;
    items: OrderItemDto[];
    totalAmount: number;
    invoicedAt: Date;
    createdAt: Date;
}
export {};
