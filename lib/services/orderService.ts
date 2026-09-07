import { CheckoutOrderSchema, CheckoutOrderInput } from '@/lib/validations';
import { PRODUCTS } from '@/lib/products-data';

export interface OrderCreationResult {
  orderId: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  date: string;
  status: string;
  estimatedDelivery: string;
}

export class OrderService {
  /**
   * Validate checkout input and calculate server-verified pricing
   */
  static async createOrder(rawBody: unknown): Promise<OrderCreationResult> {
    // 1. Zod Validation
    const validationResult = CheckoutOrderSchema.safeParse(rawBody);
    if (!validationResult.success) {
      throw new Error(`Order Validation Failed: ${validationResult.error.errors.map((e) => e.message).join(', ')}`);
    }

    const orderInput = validationResult.data;

    // 2. Server-side price calculation (never trust client prices!)
    let serverSubtotal = 0;
    for (const item of orderInput.items) {
      const dbProduct = PRODUCTS.find((p) => p.id === item.product.id);
      if (!dbProduct) {
        throw new Error(`Product ID ${item.product.id} no longer exists in inventory.`);
      }
      serverSubtotal += dbProduct.price * item.quantity;
    }

    const shippingFee = serverSubtotal > 5000 || serverSubtotal === 0 ? 0 : 500;
    const total = serverSubtotal + shippingFee;

    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      orderId,
      subtotal: serverSubtotal,
      shippingFee,
      discount: 0,
      total,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Processing',
      estimatedDelivery: '3 Business Days via Concierge Express',
    };
  }
}
