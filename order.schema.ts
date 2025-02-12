import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({ required: true, unique: true })
    orderId: string;

    @Prop({ required: true })
    customerId: string;

    @Prop({ required: true, type: [{ itemId: String, quantity: Number }] })
    items: { itemId: string; quantity: number }[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true })
    invoicedAt: Date;

    @Prop({ required: true })
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);