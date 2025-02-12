import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

class OrderItemDto {
  @IsString()
  itemId: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderRequestDto {
  @IsString()
  orderId: string;

  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  totalAmount: number;

  @Type(() => Date)
  @IsDate()
  invoicedAt: Date;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}