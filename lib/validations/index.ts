import { z } from 'zod';

export const AIChatRequestSchema = z.object({
  message: z.string().min(1, { message: 'Query message cannot be empty' }).max(1000),
  history: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .optional(),
});

export const ShippingAddressSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  phone: z.string().min(8, { message: 'Valid phone number is required' }),
  address: z.string().min(5, { message: 'Street address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  pincode: z.string().min(4, { message: 'Valid pincode is required' }),
});

export const CheckoutOrderSchema = z.object({
  items: z.array(
    z.object({
      product: z.object({
        id: z.string(),
        price: z.number(),
      }),
      selectedSize: z.string(),
      selectedColor: z.string(),
      quantity: z.number().min(1),
    })
  ).min(1, { message: 'Cart cannot be empty' }),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: z.enum(['card', 'upi', 'cod', 'CARD', 'UPI', 'COD']),
});

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  occasion: z.string().optional(),
  style: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  sortBy: z.enum(['featured', 'newest', 'price-asc', 'price-desc', 'rating']).optional(),
  searchQuery: z.string().optional(),
});

export type AIChatRequest = z.infer<typeof AIChatRequestSchema>;
export type ShippingAddressInput = z.infer<typeof ShippingAddressSchema>;
export type CheckoutOrderInput = z.infer<typeof CheckoutOrderSchema>;
export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
