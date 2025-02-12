import { Document } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class Order {
    orderId: string;
    customerId: string;
    items: {
        itemId: string;
        quantity: number;
    }[];
    totalAmount: number;
    invoicedAt: Date;
    createdAt: Date;
}
