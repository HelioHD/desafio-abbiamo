export interface Order {
    id: string;
    product: string;
    quantity: number;
    status: 'pending' | 'completed' | 'canceled';
}
